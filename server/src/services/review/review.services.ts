import { ObjectId } from 'mongodb'
import { BadRequestError, InternalServerError } from '~/models/errors/errors'
import Review from '~/models/schemas/reviews/reviews.schemas'
import { TReviewProps } from '~/models/schemas/reviews/type'
import databaseService from '~/services/database/database.services'
import orderServices from '~/services/order/orders.services'
import productServices from '~/services/product/product.services'
import { TCreateReviewPayload } from '~/services/review/type'

class ReviewServices {
  async getReview() {
    return (await databaseService.reviews.find().toArray()) || []
  }

  async getReviewById(review_id: string) {
    if (!review_id) {
      throw new BadRequestError()
    }
    return ((await databaseService.reviews.findOne({ _id: new ObjectId(review_id) })) as TReviewProps) || {}
  }

  async createReview({ user_id, order_id, product_id, variant_id, title, description, rate }: TCreateReviewPayload) {
    if (!user_id || !order_id || !variant_id || !title || !description || rate === undefined) {
      throw new BadRequestError()
    }
    await orderServices.findVariantUnreview({ order_id, variant_id })
    const _id = new ObjectId()
    const review = new Review({
      _id,
      user_id: new ObjectId(user_id),
      order_id: new ObjectId(order_id),
      product_id: new ObjectId(product_id),
      variant_id: new ObjectId(variant_id),
      description,
      title,
      rate
    })
    const result = await databaseService.reviews.insertOne(review)
    if (!result.acknowledged || !result.insertedId) {
      throw new InternalServerError()
    }
    await orderServices.updateIsReviewed(order_id, variant_id)
    await productServices.updateProduct(product_id, { rate })
    return this.getReviewById(_id.toString())
  }
}

const reviewServices = new ReviewServices()

export default reviewServices
