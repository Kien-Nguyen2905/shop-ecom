import { ObjectId } from 'mongodb'

export interface TProductCartProps {
  product_id: ObjectId
  image: string
  name: string
  variant_id: ObjectId
  color: string
  price: number
  discount: number
  quantity: number
}
export type TCartProps = {
  _id?: ObjectId
  user_id: ObjectId
  product?: TProductCartProps[]
  created_at?: Date
  updated_at?: Date
}
