import { ObjectId } from 'mongodb'

export type TUserReview = {
  user_id: string
  full_name: string
  email: string
}
export type TProductReview = {
  product_id: ObjectId
  variant_id: ObjectId
  name: string
  image: string
  color: string
}
export type TReviewProps = {
  _id?: ObjectId
  reviewer: TUserReview
  order_id: ObjectId
  product: TProductReview
  title: string
  description: string
  rate: number
  created_at?: Date
  updated_at?: Date
}
