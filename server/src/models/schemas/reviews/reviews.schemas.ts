import { ObjectId } from 'mongodb'
import { TProductReview, TReviewProps, TUserReview } from '~/models/schemas/reviews/type'

export default class Review {
  _id?: ObjectId
  reviewer: TUserReview
  order_id: ObjectId
  product: TProductReview
  title: string
  description: string
  rate: number
  created_at?: Date
  updated_at?: Date
  constructor(review: TReviewProps) {
    const date = new Date()
    this._id = review._id
    this.reviewer = review.reviewer
    this.order_id = review.order_id
    this.product = review.product
    this.title = review.title
    this.description = review.description
    this.rate = review.rate
    this.created_at = review.created_at || date
    this.updated_at = review.updated_at || date
  }
}
