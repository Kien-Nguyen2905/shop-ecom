import { ParamSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { BRAND_MESSAGES } from '~/constants/message'

export const brandIdSchema: ParamSchema = {
  notEmpty: {
    errorMessage: BRAND_MESSAGES.BRAND_NAME_REQUIRED
  },
  trim: true,
  custom: {
    options: (value) => {
      // Check if the value is a valid MongoDB ObjectId
      if (!ObjectId.isValid(value)) {
        throw new Error(BRAND_MESSAGES.BRAND_ID_INVALID)
      }
      return true
    }
  }
}
export const brandNameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: BRAND_MESSAGES.BRAND_NAME_REQUIRED
  },
  isString: {
    errorMessage: BRAND_MESSAGES.BRAND_NAME_STRING
  },
  trim: true
}
