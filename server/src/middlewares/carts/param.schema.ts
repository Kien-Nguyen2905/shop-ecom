import { ParamSchema } from 'express-validator'
import { POPULAR_MESSAGES } from '~/constants/message'

export const quantityCartSchema: ParamSchema = {
  notEmpty: {
    errorMessage: POPULAR_MESSAGES.QUANTITY_REQUIRED
  },
  isNumeric: {
    errorMessage: POPULAR_MESSAGES.QUANTITY_NUMERIC
  }
}
