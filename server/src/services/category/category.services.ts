import { ObjectId } from 'mongodb'
import { CATEGORY_MESSAGES } from '~/constants/message'
import { ConflictRequestError, InternalServerError, NotFoundError } from '~/models/errors/errors'
import Category from '~/models/schemas/categories/categories.schemas'
import { TCategoryPayload } from '~/services/category/type'
import databaseService from '~/services/database/database.services'
import productServices from '~/services/product/product.services'

class CategoryServices {
  async createCategory(name: string) {
    const categoryExist = await databaseService.categories.findOne({ name })
    if (categoryExist) {
      throw new ConflictRequestError({
        message: CATEGORY_MESSAGES.CATEGORY_NAME_EXISTS
      })
    }
    const _id = new ObjectId()
    const category = new Category({ _id, name })
    const result = await databaseService.categories.insertOne(category)
    if (!result.acknowledged) {
      throw new InternalServerError()
    }
    return category
  }

  async updateCategory({ _id, name }: TCategoryPayload) {
    const categoryId = new ObjectId(_id)
    const categoryExist = await databaseService.categories.findOne({ _id: categoryId })
    if (!categoryExist) {
      throw new NotFoundError()
    }
    const result = await databaseService.categories.updateOne(
      { _id: categoryId },
      {
        $set: {
          name
        }
      }
    )
    if (!result.acknowledged) {
      throw new InternalServerError()
    }
  }
  async getCategory() {
    return await databaseService.categories.find().toArray()
  }
  async getCategoryDetail(_id: string) {
    const categoryId = new ObjectId(_id)
    const category = await databaseService.categories.findOne({ _id: categoryId })
    if (!category) {
      throw new NotFoundError()
    }
    return category
  }
  async deleteCategory(_id: string) {
    const checkProductExist = await productServices.checkProductByCategory(_id)
    if (checkProductExist) {
      throw new ConflictRequestError({ message: CATEGORY_MESSAGES.CATEGORY_BELONG_TO_EXIST_PRODUCT })
    }
    const categoryId = new ObjectId(_id)
    const category = await databaseService.categories.findOne({ _id: categoryId })
    if (!category) {
      throw new NotFoundError()
    }
    const result = await databaseService.categories.deleteOne({ _id: categoryId })
    if (!result.acknowledged) {
      throw new InternalServerError()
    }
  }
}
const categoryServices = new CategoryServices()
export default categoryServices
