import { ObjectId } from 'mongodb'
import { STATUS_ORDER, STATUS_TRANSACTION, TYPE_PAYMENT } from '~/constants/enum'
import { BadRequestError, InternalServerError, NotFoundError } from '~/models/errors/errors'
import Order from '~/models/schemas/orders/orders.schemas'
import { TOrderProps } from '~/models/schemas/orders/type'
import Transaction from '~/models/schemas/transactions/transactions.schemas'
import cartServices from '~/services/cart/cart.services'
import databaseService from '~/services/database/database.services'
import {
  TCreateOrderPayload,
  TFindVariantUnreview,
  TProductOrder,
  TUpdateStatusOrderPayload
} from '~/services/order/type'
import productServices from '~/services/product/product.services'
import userServices from '~/services/user/users.services'

class OrderService {
  async checkStockAvailability(products: TProductOrder[]) {
    for (let product of products) {
      // Find warehouse
      const warehouseItem = await databaseService.warehouse.findOne({
        product_id: new ObjectId(product.product_id),
        variant_id: new ObjectId(product.variant_id)
      })
      if (!warehouseItem) {
        throw new BadRequestError()
      }

      // Check quantity
      if (product.quantity > warehouseItem.stock!) {
        throw new BadRequestError({
          message: `Insufficient stock for product "${warehouseItem.product_name}" with variant "${warehouseItem.variant}" Available: ${warehouseItem.stock}.`
        })
      }
    }
  }

  async updateStockandSoldProduct({ products, reject = false }: { products: any; reject?: boolean }) {
    for (let product of products) {
      const resultProduct = await databaseService.products.updateOne(
        {
          _id: new ObjectId(product.product_id),
          'variants._id': new ObjectId(product.variant_id)
        },
        {
          $inc: {
            'variants.$.stock': reject ? product.quantity : -product.quantity,
            'variants.$.sold': reject ? -product.quantity : product.quantity
          },
          $set: {
            updated_at: new Date()
          }
        }
      )
      if (!resultProduct.acknowledged || !resultProduct.modifiedCount) {
        throw new InternalServerError()
      }
    }
  }

  async createOrder({
    user_id,
    products,
    address,
    note,
    type_payment,
    earn_point,
    phone,
    content
  }: TCreateOrderPayload) {
    // Check quantity in stock
    await this.checkStockAvailability(products)
    // Check product_id and variant_id exist
    await Promise.all(products.map((item) => productServices.checkProductandVariant(item.product_id, item.variant_id)))
    // Calculate total order
    let total = products.reduce((total, item) => {
      const currentPrice = item.price * item.quantity
      const discount = currentPrice * (1 - item.discount)
      return total + discount
    }, 0)
    // Subtract earpoint applied
    if (earn_point) {
      total = total - earn_point * 1000
    }
    // Declare productEntity
    const productEntity = products.map((product) => ({
      ...product,
      _id: new ObjectId(),
      product_id: new ObjectId(product.product_id),
      variant_id: new ObjectId(product.variant_id),
      isReviewed: false
    }))
    const orderId = new ObjectId()

    let order: any = {}
    if (type_payment === TYPE_PAYMENT.COD) {
      order = new Order({
        _id: orderId,
        user_id: new ObjectId(user_id),
        products: productEntity,
        address: address!,
        note,
        total,
        earn_point: earn_point || 0,
        phone,
        status: STATUS_ORDER.PENDING,
        type_payment
      })
    } else {
      order = new Order({
        _id: orderId,
        user_id: new ObjectId(user_id),
        products: productEntity,
        address: address!,
        note,
        phone,
        total,
        earn_point: earn_point || 0,
        status: STATUS_ORDER.PENDING,
        type_payment: type_payment!
      })
    }
    const result = await databaseService.orders.insertOne(order)
    if (!result.acknowledged || !result.insertedId) {
      throw new InternalServerError()
    }

    let transaction: any = {}
    if (type_payment === TYPE_PAYMENT.COD) {
      transaction = new Transaction({
        order_id: orderId,
        user_id: new ObjectId(user_id),
        method_payment: 'COD',
        status: STATUS_TRANSACTION.PENDING,
        type_payment: TYPE_PAYMENT.COD,
        value: total
      })
    } else {
      transaction = new Transaction({
        order_id: orderId,
        user_id: new ObjectId(user_id),
        method_payment: 'BANKING',
        status: STATUS_TRANSACTION.PENDING,
        type_payment: TYPE_PAYMENT.BANKING,
        value: total,
        content
      })
    }
    await databaseService.transactions.insertOne(transaction)
    // Update sold and stock in warehouse
    await Promise.all(
      products.map(async (result) => {
        const variantId = result.variant_id
        const totalQuantitySold = result.quantity

        const warehouseItem = await databaseService.warehouse.findOne({ variant_id: new ObjectId(variantId) })

        if (warehouseItem) {
          const updatedSold = warehouseItem.sold! + totalQuantitySold
          const updatedStock = warehouseItem.stock! - totalQuantitySold

          await databaseService.warehouse.updateOne(
            { variant_id: new ObjectId(variantId) },
            {
              $set: {
                sold: updatedSold,
                stock: updatedStock,
                updated_at: new Date()
              }
            }
          )
        }
      })
    )

    // Update stock product
    await this.updateStockandSoldProduct({ products })
    // Remove product had been ordered in cart
    const cart = await cartServices.getCart(user_id)
    if (!cart) {
      throw new NotFoundError()
    }
    // Product not in order
    const productNotOrder = cart?.products?.filter(
      (item) =>
        !products.some(
          (filterItem) =>
            item.product_id.toString() === filterItem.product_id && item.variant_id.toString() === filterItem.variant_id
        )
    )
    // Update cart with product not in order
    const productStillInCart = await databaseService.carts.updateOne(
      {
        user_id: new ObjectId(user_id)
      },
      {
        $set: {
          products: productNotOrder,
          updated_at: new Date()
        }
      }
    )
    if (!productStillInCart.acknowledged || !productStillInCart.modifiedCount) {
      throw new InternalServerError()
    }
    // Update amount order and earn point in profile user
    const resultOrder = await this.getOrderByUser(user_id)
    await userServices.updateProfile({
      user_id,
      earn_point: -earn_point!,
      total_order: resultOrder.length
    })

    return (await databaseService.orders.findOne({ _id: orderId })) || {}
  }

  async getOrder() {
    return (
      (
        await databaseService.orders.aggregate([
          {
            $lookup: {
              from: 'transactions',
              localField: '_id',
              foreignField: 'order_id',
              as: 'transaction'
            }
          },
          {
            $match: {
              $nor: [
                {
                  transaction: {
                    $elemMatch: { type_payment: TYPE_PAYMENT.BANKING, status: STATUS_TRANSACTION.PENDING }
                  }
                }
              ]
            }
          },
          {
            $sort: { updated_at: -1 }
          }
        ])
      ).toArray() || []
    )
  }

  async getOrderDetail(orderId: string) {
    return ((await databaseService.orders.findOne({ _id: new ObjectId(orderId) })) as TOrderProps) || {}
  }

  async updateOrder({ order_id, status }: TUpdateStatusOrderPayload) {
    const order = await this.getOrderDetail(order_id)

    if (!order) {
      throw new BadRequestError()
    }

    const resultUpdateOrder = await databaseService.orders.updateOne(
      { _id: new ObjectId(order_id) },
      {
        $set: {
          status,
          updated_at: new Date()
        }
      }
    )
    if (!resultUpdateOrder.acknowledged || !resultUpdateOrder.modifiedCount) {
      throw new InternalServerError()
    }
    if (status === STATUS_ORDER.ACCEPT) {
      const user = await databaseService.users.findOne({ _id: order.user_id })
      if (user) {
        const newTotalPaid = (user.total_paid || 0) + order.total
        await databaseService.users.updateOne(
          { _id: order.user_id },
          {
            $set: {
              total_paid: newTotalPaid,
              updated_at: new Date()
            }
          }
        )
      }
    }
    // CANCLE AND RETURN FOR COD
    if (status === STATUS_ORDER.CANCLE || status === STATUS_ORDER.RETURN) {
      await databaseService.transactions.updateOne(
        { order_id: new ObjectId(order._id), type_payment: TYPE_PAYMENT.COD },
        {
          $set: {
            status: STATUS_TRANSACTION.FAIL,
            updated_at: new Date()
          }
        }
      )
      // Cập nhật warehouse với số lượng sold và stock mới
      await Promise.all(
        order.products.map(async (result) => {
          const variantId = result.variant_id
          const totalQuantitySold = result.quantity

          const warehouseItem = await databaseService.warehouse.findOne({ variant_id: new ObjectId(variantId) })

          if (warehouseItem) {
            const updatedSold = warehouseItem.sold! - totalQuantitySold
            const updatedStock = warehouseItem.stock! + totalQuantitySold

            await databaseService.warehouse.updateOne(
              { variant_id: new ObjectId(variantId) },
              {
                $set: {
                  sold: updatedSold,
                  stock: updatedStock,
                  updated_at: new Date()
                }
              }
            )
          }
        })
      )
      // Cập nhật stock ở product
      await this.updateStockandSoldProduct({ products: order.products, reject: true })
      if (order.earn_point > 0) {
        await userServices.updateProfile({
          user_id: order.user_id.toString(),
          earn_point: order.earn_point!
        })
      }
    }

    return (await this.getOrderDetail(order_id)) || {}
  }

  async getOrderByUser(user_id: string) {
    return (
      (await databaseService.orders
        .aggregate([
          {
            $match: {
              user_id: new ObjectId(user_id)
            }
          },
          {
            $lookup: {
              from: 'transactions',
              localField: '_id',
              foreignField: 'order_id',
              as: 'transaction'
            }
          },
          {
            $sort: {
              created_at: -1
            }
          }
        ])
        .toArray()) || []
    )
  }

  async findVariantUnreview({ order_id, variant_id }: TFindVariantUnreview) {
    const variantInOrder = await databaseService.orders.findOne({
      _id: new ObjectId(order_id),
      products: {
        $elemMatch: {
          variant_id: new ObjectId(variant_id),
          isReviewed: false
        }
      },
      status: STATUS_ORDER.ACCEPT
    })
    if (!variantInOrder) {
      throw new NotFoundError()
    }
    return variantInOrder
  }

  async updateIsReviewed(order_id: string, variant_id: string) {
    const order = await this.getOrderDetail(order_id)
    if (!order) {
      throw new NotFoundError()
    }
    const result = await databaseService.orders.updateOne(
      {
        _id: new ObjectId(order_id),
        products: {
          $elemMatch: {
            variant_id: new ObjectId(variant_id),
            isReviewed: false
          }
        },
        status: STATUS_ORDER.ACCEPT
      },
      {
        $set: {
          'products.$.isReviewed': true
        }
      }
    )
    if (!result.acknowledged || !result.modifiedCount) {
      throw new InternalServerError()
    }
  }

  async cancleOrder(order_id: string) {
    const order = await this.getOrderDetail(order_id)
    if (!order) {
      throw new BadRequestError()
    }
    if (order.status === STATUS_ORDER.PENDING) {
      // Cập nhật warehouse với số lượng sold và stock mới
      await Promise.all(
        order.products.map(async (result) => {
          const variantId = result.variant_id
          const totalQuantitySold = result.quantity

          const warehouseItem = await databaseService.warehouse.findOne({ variant_id: new ObjectId(variantId) })

          if (warehouseItem) {
            const updatedSold = warehouseItem.sold! - totalQuantitySold
            const updatedStock = warehouseItem.stock! + totalQuantitySold

            await databaseService.warehouse.updateOne(
              { variant_id: new ObjectId(variantId) },
              {
                $set: {
                  sold: updatedSold,
                  stock: updatedStock,
                  updated_at: new Date()
                }
              }
            )
          }
        })
      )
      // Cập nhật stock ở product
      await this.updateStockandSoldProduct({ products: order.products, reject: true })
      if (order.earn_point > 0) {
        await userServices.updateProfile({
          user_id: order.user_id.toString(),
          earn_point: order.earn_point!
        })
      }
      // Delete transaction
      await databaseService.transactions.deleteOne({ order_id: new ObjectId(order._id) })
      // Delete order
      await databaseService.orders.deleteOne({ _id: new ObjectId(order._id) })
    } else {
      throw new BadRequestError({ message: 'Order have been accepted' })
    }
  }
}

const orderServices = new OrderService()

export default orderServices
