import { ParamSchema } from 'express-validator'
import { CATEGORY_MESSAGES } from '~/constants/message'
import { idObjectInvalid } from '~/utils/checkValidObjectId'

export const categoryIdSchema: ParamSchema = {
  notEmpty: {
    errorMessage: CATEGORY_MESSAGES.CATEGORY_NAME_REQUIRED
  },
  trim: true,
  custom: {
    options: (value) => {
      idObjectInvalid({ id: value, validation: true })
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
