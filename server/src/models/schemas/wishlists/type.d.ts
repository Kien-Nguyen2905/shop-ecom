import { ObjectId } from 'mongodb'

export type TListItem = {
  _id: ObjectId
  product_id: ObjectId
  variant_id: ObjectId
  image: string
  name: string
  price: number
  discount: number
}
export type TWishlistProps = {
  _id?: ObjectId
  user_id: ObjectId
  list_item?: TListItem[]
  created_at?: Date
  updated_at?: Date
}
