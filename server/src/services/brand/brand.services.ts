import { ObjectId } from 'mongodb'
import { BRAND_MESSAGES } from '~/constants/message'
import { BadRequestError, ConflictRequestError, InternalServerError, NotFoundError } from '~/models/errors/errors'
import Brand from '~/models/schemas/brands/brands.schemas'
import { TBrandProps } from '~/models/schemas/brands/type'
import { TBrandPayload } from '~/services/brand/type'
import databaseService from '~/services/database/database.services'
import productServices from '~/services/product/product.services'

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
    if (!result.acknowledged || !result.insertedId) {
      throw new InternalServerError()
    }

    return this.getBrandDetail(_id.toString()) || []
  }

  async updateBrand({ _id, name }: TBrandPayload) {
    const brandUpdate = await databaseService.brands.findOne({ _id: new ObjectId(_id) })

    if (!brandUpdate) {
      throw new NotFoundError({
        message: BRAND_MESSAGES.BRAND_NOT_EXISTS
      })
    }

    const result = await databaseService.brands.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          name
        }
      }
    )

    if (!result.acknowledged || !result.modifiedCount) {
      throw new InternalServerError()
    }

    return this.getBrandDetail(_id) || {}
  }

  async getBrands() {
    return (await databaseService.brands.find().toArray()) || []
  }

  async getBrandDetail(_id: string) {
    const result = (await databaseService.brands.findOne({ _id: new ObjectId(_id) })) as TBrandProps
    if (!result) {
      throw new NotFoundError()
    }
    return result
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

    const result = await databaseService.brands.deleteOne({ _id: brandId })
    if (!result.acknowledged || !result.deletedCount) {
      throw new InternalServerError()
    }
  }
}

const brandServices = new BrandServices()
export default brandServices
