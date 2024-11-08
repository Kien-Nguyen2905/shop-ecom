import { ParamSchema } from 'express-validator'
import { CART_MESSAGE, POPULAR_MESSAGES } from '~/constants/message'
import { idObjectInvalid } from '~/utils/checkValidObjectId'

export const quantityCartSchema: ParamSchema = {
  notEmpty: {
    errorMessage: POPULAR_MESSAGES.QUANTITY_REQUIRED
  },
  isNumeric: {
    errorMessage: POPULAR_MESSAGES.QUANTITY_NUMERIC
  }
}

export const itemIdCartSchema: ParamSchema = {
  notEmpty: {
    errorMessage: CART_MESSAGE.ITEM_ID_REQUIRED
  },
  trim: true,
  custom: {
    options: (value) => {
      idObjectInvalid({ id: value, validation: true })
    }
  }
}
