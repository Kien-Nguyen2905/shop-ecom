import { TProductReview, TUserReview } from './../../models/schemas/reviews/type.d'
import { ObjectId } from 'mongodb'
import { InternalServerError, NotFoundError } from '~/models/errors/errors'
import Review from '~/models/schemas/reviews/reviews.schemas'
import { TReviewProps } from '~/models/schemas/reviews/type'
import databaseService from '~/services/database/database.services'
import orderServices from '~/services/order/orders.services'
import productServices from '~/services/product/product.services'
import { TCreateReviewPayload } from '~/services/review/type'
import userServices from '~/services/user/users.services'

class ReviewServices {
  async getReview(search?: string) {
    const filter = search
      ? { 'product.name': { $regex: search, $options: 'i' } } // Case-insensitive search in the `product.name` field
      : {}

    return (await databaseService.reviews.find(filter).toArray()) || []
  }

  async getReviewById(review_id: string) {
    return ((await databaseService.reviews.findOne({ _id: new ObjectId(review_id) })) as TReviewProps) || {}
  }

  async createReview({ user_id, order_id, product_id, variant_id, title, description, rate }: TCreateReviewPayload) {
    // await productServices.checkProductandVariant(product_id, variant_id)
    const productExist = await productServices.getProductById(product_id)
    const variantExist = productExist.variants.find((item) => item._id.toString() === variant_id)
    if (!variantExist) {
      throw new NotFoundError({ message: 'Product had been deleted!' })
    }
    await orderServices.findVariantUnreview({ order_id, variant_id })
    const _id = new ObjectId()
    let reviewer: TUserReview = { email: '', full_name: '', user_id: '' }
    await userServices.updateProfile({ user_id, earn_point: 1 })
    const resUser = await userServices.getProfile(user_id)
    if (resUser) {
      reviewer.email = resUser.email
      reviewer.full_name = resUser.full_name || ''
      reviewer.user_id = resUser._id.toString()
    }
    let product: TProductReview = {
      product_id: new ObjectId(),
      variant_id: new ObjectId(),
      color: '',
      image: '',
      name: ''
    }
    const resProduct = await productServices.getProductById(product_id)
    if (resProduct._id && resProduct.variants && resProduct.name && resProduct.thumbnail) {
      product.product_id = resProduct._id
      product.variant_id = resProduct.variants.find((item) => item._id.toString() === variant_id)?._id!
      product.color = resProduct.variants.find((item) => item._id.toString() === variant_id)?.color || ''
      product.name = resProduct.name
      product.image = resProduct.variants.find((item) => item._id.toString() === variant_id)?.images[0] || ''
    }
    const review = new Review({
      _id,
      reviewer,
      order_id: new ObjectId(order_id),
      product,
      description,
      title,
      rate
    })
    const result = await databaseService.reviews.insertOne(review)
    if (!result.acknowledged || !result.insertedId) {
      throw new InternalServerError()
    }
    await orderServices.updateIsReviewed(order_id, variant_id)
    await productServices.updateRateProduct(product_id, rate)
    return this.getReviewById(_id.toString())
  }

  async getReviewByProductId(product_id: string) {
    return (
      ((await databaseService.reviews
        .find({ 'product.product_id': new ObjectId(product_id) })
        .toArray()) as TReviewProps[]) || []
    )
  }
}

const reviewServices = new ReviewServices()

export default reviewServices
