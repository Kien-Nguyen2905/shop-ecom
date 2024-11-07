import { ObjectId } from 'mongodb'
import { BadRequestError, ConflictRequestError, InternalServerError } from '~/models/errors/errors'
import { TWishlistProps } from '~/models/schemas/wishlists/type'
import databaseService from '~/services/database/database.services'
import productServices from '~/services/product/product.services'
import { TUpdateWishListPayload } from '~/services/wishlist/type'
import { isInValidId } from '~/utils/checkValidObjectId'

class WishlistService {
  async getWishList(user_id: string) {
    return ((await databaseService.wishlist.findOne({ user_id: new ObjectId(user_id) })) as TWishlistProps) || {}
  }
  async updateWishList({ user_id, product_id }: TUpdateWishListPayload) {
    await isInValidId(product_id)
    const productExist = await productServices.getProductById(product_id)
    if (!productExist) {
      throw new BadRequestError()
    }
    const payloadItem = {
      product_id: new ObjectId(productExist._id),
      image: productExist.thumbnail,
      name: productExist.name,
      price: productExist.variants[0].price,
      discount: productExist.variants[0].discount
    }
    const wistList = await this.getWishList(user_id)
    const itemExist = wistList.list_item?.find((item) => item.product_id.toString() === product_id)
    if (itemExist) {
      throw new ConflictRequestError()
    }
    const result = await databaseService.wishlist.updateOne(
      {
        user_id: new ObjectId(user_id)
      },
      {
        $push: {
          list_item: payloadItem
        }
      }
    )
    if (!result.modifiedCount) {
      throw new InternalServerError()
    }
    return await this.getWishList(user_id)
  }
}
const wishlistServices = new WishlistService()
export default wishlistServices
