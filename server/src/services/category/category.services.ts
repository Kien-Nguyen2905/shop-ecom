import { ObjectId } from 'mongodb'
import { CATEGORY_MESSAGES } from '~/constants/message'
import { BadRequestError, ConflictRequestError, InternalServerError, NotFoundError } from '~/models/errors/errors'
import Category from '~/models/schemas/categories/categories.schemas'
import { TCategoryProps } from '~/models/schemas/categories/type'
import { TCategoryPayload } from '~/services/category/type'
import databaseService from '~/services/database/database.services'
import productServices from '~/services/product/product.services'

class CategoryServices {
  async createCategory(name: string) {
    await this.checkCategoryExist(name)

    const _id = new ObjectId()
    const category = new Category({ _id, name })

    const result = await databaseService.categories.insertOne(category)

    if (!result.acknowledged || !result.insertedId) {
      throw new InternalServerError()
    }

    return (await databaseService.categories.findOne(_id)) || {}
  }

  async updateCategory({ _id, name }: TCategoryPayload) {
    const categoryUpdate = await this.getCategoryById(_id)

    const result = await databaseService.categories.updateOne(
      { _id: categoryUpdate._id },
      {
        $set: {
          name,
          updated_at: new Date()
        }
      }
    )

    if (!result.acknowledged || !result.modifiedCount) {
      throw new InternalServerError()
    }

    return this.getCategoryById(_id)
  }

  async getCategory() {
    return (await databaseService.categories.find().toArray()) || []
  }

  async getCategoryById(_id: string) {
    const result = ((await databaseService.categories.findOne({ _id: new ObjectId(_id) })) as TCategoryProps) || {}
    if (!result) {
      throw new NotFoundError({ message: CATEGORY_MESSAGES.CATEGORY_NOT_EXISTS })
    }
    return result
  }

  async deleteCategory(_id: string) {
    await this.checkCategoryBelongProduct(_id)

    await this.getCategoryById(_id)

    const result = await databaseService.categories.deleteOne({ _id: new ObjectId(_id) })
    if (!result.acknowledged || !result.deletedCount) {
      throw new InternalServerError()
    }
  }

  async checkCategoryExist(name: string) {
    const result = await databaseService.categories.findOne({ name: name })
    if (result) {
      throw new ConflictRequestError({
        message: CATEGORY_MESSAGES.CATEGORY_NAME_EXISTS
      })
    }
  }

  async checkCategoryBelongProduct(_id: string) {
    const checkProductExist = await productServices.checkProductByCategory(_id)
    if (checkProductExist) {
      throw new ConflictRequestError({ message: CATEGORY_MESSAGES.CATEGORY_BELONG_TO_EXIST_PRODUCT })
    }
  }
}
const categoryServices = new CategoryServices()
export default categoryServices
