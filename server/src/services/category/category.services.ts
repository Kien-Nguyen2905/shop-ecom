import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/message'
import { ConflictRequestError, ErrorWithStatus, InternalServerError, NotFoundError } from '~/models/errors/errors'
import Category from '~/models/schemas/categories/categories.schemas'
import { TCategoryPayload } from '~/services/category/type'
import databaseService from '~/services/database/database.services'

class CategoryServices {
  async checkCategoryExist(name: string) {
    const category = await databaseService.categories.findOne({ name })
    return Boolean(category)
  }
  async checkCategoryExistById(_id: string) {
    const category = await databaseService.categories.findOne({ _id: new ObjectId(_id) })
    return Boolean(category)
  }
  async createCategory(name: string) {
    const categoryExist = await databaseService.categories.findOne({ name })
    if (categoryExist) {
      throw new ConflictRequestError({
        message: USERS_MESSAGES.CATEGORY_NAME_EXISTS
      })
    }
    const _id = new ObjectId()
    const category = new Category({ _id, name })
    const result = await databaseService.categories.insertOne(category)
    if (!result.acknowledged) {
      throw new InternalServerError()
    }
    return {}
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
    return {}
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
    const categoryId = new ObjectId(_id)
    const category = await databaseService.categories.findOne({ _id: categoryId })
    if (!category) {
      throw new NotFoundError()
    }
    await databaseService.categories.deleteOne({ _id: categoryId })
    return category
  }
}
const categoryServices = new CategoryServices()
export default categoryServices
