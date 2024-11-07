import { ObjectId } from 'mongodb'
import { TUpdateCartPayload } from '~/services/cart/type'
import databaseService from '~/services/database/database.services'

class CartServices {
  async getCart(id: string) {
    return (await databaseService.carts.findOne({ user_id: new ObjectId(id) })) || []
  }
  async updateCart({
    product_id,
    variant_id,
    quantity,
    image,
    color,
    discount,
    name,
    price,
    user_id
  }: TUpdateCartPayload) {
    const userId = new ObjectId(user_id)
    const productId = new ObjectId(product_id)
    const variantId = new ObjectId(variant_id)

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const cart = await databaseService.carts.findOne({ user_id: userId })

    if (cart) {
      const existingProductIndex = cart.product?.findIndex(
        (product) => product.product_id.equals(productId) && product.variant_id.equals(variantId)
      )

      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, cập nhật lại thông tin
        cart.product![existingProductIndex!].quantity += quantity
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
        cart.product!.push({
          product_id: productId,
          variant_id: variantId,
          quantity,
          image,
          color,
          discount,
          name,
          price
        })
      }

      // Cập nhật giỏ hàng trong cơ sở dữ liệu
      await databaseService.carts.updateOne(
        { user_id: userId },
        {
          $set: {
            product: cart.product,
            updated_at: new Date()
          }
        }
      )
    } else {
      // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới với sản phẩm này
      await databaseService.carts.insertOne({
        user_id: userId,
        product: [
          {
            product_id: productId,
            variant_id: variantId,
            quantity,
            image,
            color,
            discount,
            name,
            price
          }
        ],
        created_at: new Date(),
        updated_at: new Date()
      })
    }

    // Trả về giỏ hàng đã cập nhật hoặc đã thêm mới
    return (await databaseService.carts.findOne({ user_id: userId })) || []
  }
}

const cartServices = new CartServices()
export default cartServices
