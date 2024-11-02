import { ParamSchema } from 'express-validator'
import { USERS_MESSAGES } from '~/constants/message'

export const categoryIdSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.CATEGORY_NAME_REQUIRED
  },
  trim: true
}
export const categoryNameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.CATEGORY_NAME_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.CATEGORY_NAME_STRING
  },
  trim: true
}
