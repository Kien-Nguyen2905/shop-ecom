import { ParamSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { CATEGORY_MESSAGES } from '~/constants/message'

export const categoryIdSchema: ParamSchema = {
  notEmpty: {
    errorMessage: CATEGORY_MESSAGES.CATEGORY_NAME_REQUIRED
  },
  trim: true,
  custom: {
    options: (value) => {
      if (!ObjectId.isValid(value)) {
        throw new Error(CATEGORY_MESSAGES.CATEGORY_ID_INVALID)
      }
      return true
    }
  }
}
export const categoryNameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: CATEGORY_MESSAGES.CATEGORY_NAME_REQUIRED
  },
  isString: {
    errorMessage: CATEGORY_MESSAGES.CATEGORY_NAME_STRING
  },
  trim: true
}
