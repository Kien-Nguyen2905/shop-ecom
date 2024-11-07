import { ParamSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { POPULAR_MESSAGES } from '~/constants/message'
export const idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: POPULAR_MESSAGES.ID_REQUIRED
  },
  trim: true,
  custom: {
    options: (value) => {
      // Check if the value is a valid MongoDB ObjectId
      if (!ObjectId.isValid(value)) {
        throw new Error(POPULAR_MESSAGES.ID_INVALID)
      }
      return true
    }
  }
}
