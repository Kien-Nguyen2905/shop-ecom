import { ObjectId } from 'mongodb'
import { BRAND_MESSAGES } from '~/constants/message'
import { BadRequestError, ConflictRequestError, InternalServerError, NotFoundError } from '~/models/errors/errors'
import Brand from '~/models/schemas/brands/brands.schemas'
import { TBrandPayload } from '~/services/brand/type'
import databaseService from '~/services/database/database.services'
import productServices from '~/services/product/product.services'
import { isInValidId } from '~/utils/checkValidObjectId'

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
    return this.getBrandDetail(_id.toString()) || []
  }

  async updateBrand({ _id, name }: TBrandPayload) {
    const brandId = new ObjectId(_id)
    const brandExist = await databaseService.brands.findOne({ _id: brandId })
    if (!brandExist) {
      throw new NotFoundError({
        message: BRAND_MESSAGES.BRAND_NOT_EXISTS
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
    return this.getBrandDetail(_id) || []
  }

  async getBrands() {
    return (await databaseService.brands.find().toArray()) || []
  }

  async getBrandDetail(_id: string) {
    isInValidId(_id)
    const brand = await databaseService.brands.findOne({ _id: new ObjectId(_id) })
    if (!brand) {
      throw new NotFoundError({
        message: BRAND_MESSAGES.BRAND_NOT_EXISTS
      })
    }
    return brand
  }

  async deleteBrand(_id: string) {
    const checkProductExist = await productServices.checkProductByBrand(_id)
    if (checkProductExist) {
      throw new ConflictRequestError({ message: BRAND_MESSAGES.BRAND_BELONG_TO_EXIST_PRODUCT })
    }
    const brandId = new ObjectId(_id)
    const brand = await databaseService.brands.findOne({ _id: brandId })
    if (!brand) {
      throw new NotFoundError({
        message: BRAND_MESSAGES.BRAND_NOT_EXISTS
      })
    }
    await databaseService.brands.deleteOne({ _id: brandId })
  }
}

const brandServices = new BrandServices()
export default brandServices
