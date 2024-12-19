import { ObjectId } from 'mongodb'

export type TItemWishList = {
  _id: ObjectId
  product_id: string
  image: string
  name: string
  price: number
  discount: number
}
export type TUpdateWishListPayload = {
  user_id: string
  product_id: string
  variant_id: string
  quantity: number
}
