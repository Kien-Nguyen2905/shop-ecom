import { checkSchema } from 'express-validator'
import {
  earnPointSchema,
  noteSchema,
  orderIdSchema,
  productsSchema,
  statusSchema,
  transactionIdSchema,
  typePaymentSchema
} from '~/middlewares/orders/param.schema'
import { addressSchema } from '~/middlewares/users/param.schema'
import { validate } from '~/utils/validate'

export const createOrderValidator = validate(
  checkSchema(
    {
      products: productsSchema,
      address: addressSchema,
      note: noteSchema,
      type_payment: typePaymentSchema,
      earn_point: earnPointSchema,
      transaction_id: transactionIdSchema
    },
    ['body']
  )
)
export const updateOrderValidator = validate(
  checkSchema(
    {
      order_id: orderIdSchema,
      status: statusSchema
    },
    ['body']
  )
)
