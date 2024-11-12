import { ObjectId } from 'mongodb'
import { STATUS_ORDER, TYPE_PAYMENT } from '~/constants/enum'
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
        throw new BadRequestError()
      }
    }
  }
  async updateStockProduct(products: any) {
    for (let product of products) {
      const resultProduct = await databaseService.products.updateOne(
        {
          _id: product.product_id,
          'variants._id': product.variant_id
        },
        {
          $inc: {
            'variants.$.stock': -product.quantity
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
    transaction_id
  }: TCreateOrderPayload) {
    // Check quantity in stock
    await this.checkStockAvailability(products)

    await Promise.all(products.map((item) => productServices.checkProductandVariant(item.product_id, item.variant_id)))
    let total = products.reduce((total, item) => {
      const currentPrice = item.price * item.quantity
      const discount = currentPrice * (1 - item.discount)
      return total + discount
    }, 0)
    if (earn_point) {
      total += total - earn_point * 1000
    }
    const productEntity = products.map((product) => ({
      ...product,
      product_id: new ObjectId(product.product_id),
      variant_id: new ObjectId(product.variant_id),
      isReviewed: false
    }))
    const orderId = new ObjectId()
    const transactionId = new ObjectId()
    let order: any = {}
    if (type_payment === TYPE_PAYMENT.COD) {
      order = new Order({
        user_id: new ObjectId(user_id),
        products: productEntity,
        address: address!,
        note,
        total,
        status: STATUS_ORDER.WAITING,
        type_payment,
        transaction_id: transactionId
      })
      const transaction = new Transaction({
        _id: transactionId,
        type_payment,
        method_payment: type_payment ? 'BANKING' : 'COD',
        user_id: new ObjectId(user_id),
        value: total
      })
      await databaseService.transactions.insertOne(transaction)
    }
    order = new Order({
      _id: orderId,
      user_id: new ObjectId(user_id),
      products: productEntity,
      address: address!,
      note,
      total,
      status: STATUS_ORDER.WAITING,
      type_payment: type_payment!,
      transaction_id: new ObjectId(transaction_id)
    })
    const result = await databaseService.orders.insertOne(order)
    if (!result.acknowledged || !result.insertedId) {
      throw new InternalServerError()
    }
    const cart = await cartServices.getCart(user_id)
    if (!cart) {
      throw new NotFoundError()
    }
    const productNotOrder = cart?.products?.filter(
      (item) =>
        !products.some(
          (filterItem) =>
            item.product_id.toString() === filterItem.product_id && item.variant_id.toString() === filterItem.variant_id
        )
    )
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
    const resultOrder = await this.getOrderByUser(user_id)
    await userServices.updateProfile({
      user_id,
      earn_point: -earn_point!,
      total_paid: total,
      total_order: resultOrder.length
    })
    return (await databaseService.orders.findOne({ _id: orderId })) || {}
  }
  async getOrder() {
    return (await databaseService.orders.find().toArray()) || []
  }
  async getOrderDetail(orderId: string) {
    return ((await databaseService.orders.findOne({ _id: new ObjectId(orderId) })) as TOrderProps) || {}
  }
  async updateOrder({ user_id, order_id, status }: TUpdateStatusOrderPayload) {
    const order = await this.getOrderDetail(order_id)
    if (!order) {
      throw new NotFoundError()
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
      // Tính tổng số lượng của mỗi variant_id từ các sản phẩm trong đơn hàng
      const aggregationResult = await databaseService.orders
        .aggregate([
          {
            $match: {
              status: STATUS_ORDER.ACCEPT
            }
          },
          {
            $unwind: '$products' // Giải nén sản phẩm trong order
          },
          {
            $match: {
              'products.variant_id': {
                $in: order.products.map((p) => p.variant_id) // Lọc theo variant_id trong order
              }
            }
          },
          {
            $group: {
              _id: '$products.variant_id', // Nhóm theo variant_id
              totalQuantitySold: { $sum: '$products.quantity' } // Tính tổng số lượng bán được của mỗi variant_id
            }
          }
        ])
        .toArray()
      if (!aggregationResult) {
        throw new InternalServerError()
      }
      // Cập nhật warehouse với số lượng sold và stock mới
      await Promise.all(
        aggregationResult.map(async (result) => {
          const variantId = result._id
          const totalQuantitySold = result.totalQuantitySold

          const warehouseItem = await databaseService.warehouse.findOne({ variant_id: variantId })

          if (warehouseItem) {
            const updatedSold = warehouseItem.sold + totalQuantitySold
            const updatedStock = warehouseItem.stock! - totalQuantitySold

            await databaseService.warehouse.updateOne(
              { variant_id: variantId },
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
      await this.updateStockProduct(order.products)
    }

    return (await this.getOrderDetail(order_id)) || {}
  }
  async getOrderByUser(user_id: string) {
    return databaseService.orders.find({ user_id: new ObjectId(user_id) }).toArray() || []
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
          'products.$.isReviewed': true,
          updated_at: new Date()
        }
      }
    )
    if (!result.acknowledged || !result.modifiedCount) {
      throw new InternalServerError()
    }
  }
}

const orderServices = new OrderService()

export default orderServices
