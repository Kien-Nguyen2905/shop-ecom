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
  async updateWishList({ user_id, product_id, quantity, variant_id }: TUpdateWishListPayload) {
    // Validate product_id
    await isInValidId(product_id)

    // Check if product exists
    const productExist = await productServices.getProductById(product_id)
    if (!productExist) {
      throw new BadRequestError()
    }

    const payloadItem = {
      _id: new ObjectId(),
      variant_id: new ObjectId(variant_id),
      product_id: new ObjectId(productExist._id),
      image: productExist.thumbnail,
      name: productExist.name,
      price: productExist.variants[0].price,
      discount: productExist.variants[0].discount
    }

    const wistList = await this.getWishList(user_id)

    // Prepare the query based on quantity
    const query: Record<string, any> = {}
    if (quantity === 1) {
      // Push the item if it doesn't exist
      const itemExist = wistList.list_item?.find(
        (item) => item.product_id.toString() === product_id && item.variant_id.toString() === variant_id
      )
      if (itemExist) {
        throw new ConflictRequestError()
      }
      query.$push = { list_item: payloadItem }
    } else if (quantity === -1) {
      // Pull the item
      query.$pull = { list_item: { variant_id: new ObjectId(variant_id), product_id: new ObjectId(product_id) } }
    } else {
      throw new BadRequestError()
    }

    // Update the wishlist
    const result = await databaseService.wishlist.updateOne({ user_id: new ObjectId(user_id) }, query)

    if (!result.modifiedCount) {
      throw new InternalServerError()
    }

    return await this.getWishList(user_id)
  }
}
const wishlistServices = new WishlistService()
export default wishlistServices
