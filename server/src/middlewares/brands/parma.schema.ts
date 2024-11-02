import { ParamSchema } from 'express-validator'
import { BRAND_MESSAGES } from '~/constants/message'

export const brandIdSchema: ParamSchema = {
  notEmpty: {
    errorMessage: BRAND_MESSAGES.BRAND_NAME_REQUIRED
  },
  trim: true
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
