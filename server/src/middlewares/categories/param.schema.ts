import { ParamSchema } from 'express-validator'
import { CATEGORY_MESSAGES } from '~/constants/message'

export const categoryIdSchema: ParamSchema = {
  notEmpty: {
    errorMessage: CATEGORY_MESSAGES.CATEGORY_NAME_REQUIRED
  },
  trim: true
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
