import { ObjectId } from 'mongodb'
import { BadRequestError, InternalServerError, NotFoundError } from '~/models/errors/errors'
import { TCartProps } from '~/models/schemas/carts/type'
import { TRemoveItemCartPayload, TUpdateCartPayload } from '~/services/cart/type'
import databaseService from '~/services/database/database.services'
import productServices from '~/services/product/product.services'

class CartServices {
  async getCart(id: string) {
    return ((await databaseService.carts.findOne({ user_id: new ObjectId(id) })) as TCartProps) || []
  }

  async updateCart({ product_id, variant_id, quantity, user_id }: TUpdateCartPayload) {
    //Check quantity with variant stock
    await productServices.checkProductandVariant(product_id, variant_id, quantity)
    const productId = new ObjectId(product_id)
    const variantId = new ObjectId(variant_id)
    const product = (await productServices.getProductById(product_id)) || {}
    if (!product) {
      throw new BadRequestError()
    }
    const variant = product.variants.find((item) => item._id.toString() === variant_id)
    if (!variant) {
      throw new BadRequestError()
    }
    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const cart = await databaseService.carts.findOne({ user_id: new ObjectId(user_id) })
    if (!cart) {
      throw new NotFoundError()
    }

    const existingProductIndex = cart.products?.findIndex(
      (product) => product.product_id.equals(productId) && product.variant_id.equals(variantId)
    )
    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, cập nhật lại thông tin
      cart.products![existingProductIndex!].quantity += quantity
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
      cart.products!.push({
        _id: new ObjectId(),
        product_id: productId,
        variant_id: variantId,
        quantity,
        image: product.thumbnail,
        color: variant?.color,
        discount: variant?.discount,
        name: product.name,
        price: variant?.price
      })
    }
    // Cập nhật giỏ hàng trong cơ sở dữ liệu
    await databaseService.carts.updateOne(
      { user_id: new ObjectId(user_id) },
      {
        $set: {
          products: cart.products,
          updated_at: new Date()
        }
      }
    )
    // Trả về giỏ hàng đã cập nhật hoặc đã thêm mới
    return (await databaseService.carts.findOne({ user_id: new ObjectId(user_id) })) || []
  }

  async removeCart({ user_id, item_id }: TRemoveItemCartPayload) {
    const cart = await databaseService.carts.findOne({ user_id: new ObjectId(user_id) })
    if (!cart) {
      throw new NotFoundError()
    }
    const result = await databaseService.carts.updateOne(
      {
        user_id: new ObjectId(user_id)
      },
      {
        $pull: {
          products: { variant_id: new ObjectId(item_id) }
        },
        $set: {
          updated_at: new Date()
        }
      }
    )
    if (!result.modifiedCount && !result.acknowledged) {
      throw new InternalServerError()
    }
    return (await this.getCart(user_id)) || {}
  }
}

const cartServices = new CartServices()
export default cartServices
