import { ObjectId } from 'mongodb'
import { BRAND_MESSAGES } from '~/constants/message'
import { ConflictRequestError, InternalServerError, NotFoundError } from '~/models/errors/errors'
import Brand from '~/models/schemas/brands/brands.schemas'
import { TBrandPayload } from '~/services/brand/type'
import databaseService from '~/services/database/database.services'

class BrandServices {
  async createBrand(name: string) {
    const brandExist = await databaseService.brands.findOne({ name })
    if (brandExist) {
      throw new ConflictRequestError({
        message: BRAND_MESSAGES.BRAND_NAME_EXISTS
      })
    }
    const _id = new ObjectId()
    const brand = new Brand({ _id, name })
    const result = await databaseService.brands.insertOne(brand)
    if (!result.acknowledged) {
      throw new InternalServerError()
    }
    return brand
  }

  async updateBrand({ _id, name }: TBrandPayload) {
    const brandId = new ObjectId(_id)
    const brandExist = await databaseService.brands.findOne({ _id: brandId })
    if (!brandExist) {
      throw new NotFoundError({
        message: BRAND_MESSAGES.BRAND_NAME_NOT_EXISTS
      })
    }
    const result = await databaseService.brands.updateOne(
      { _id: brandId },
      {
        $set: {
          name
        }
      }
    )
    if (!result.acknowledged) {
      throw new InternalServerError()
    }
    return {}
  }

  async getBrands() {
    return await databaseService.brands.find().toArray()
  }

  async getBrandDetail(_id: string) {
    const brandId = new ObjectId(_id)
    const brand = await databaseService.brands.findOne({ _id: brandId })
    if (!brand) {
      throw new NotFoundError({
        message: BRAND_MESSAGES.BRAND_NAME_NOT_EXISTS
      })
    }
    return brand
  }

  async deleteBrand(_id: string) {
    const brandId = new ObjectId(_id)
    const brand = await databaseService.brands.findOne({ _id: brandId })
    if (!brand) {
      throw new NotFoundError({
        message: BRAND_MESSAGES.BRAND_NAME_NOT_EXISTS
      })
    }
    await databaseService.brands.deleteOne({ _id: brandId })
  }
}

const brandServices = new BrandServices()
export default brandServices
