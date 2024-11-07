import { checkSchema } from 'express-validator'
import { quantityCartSchema } from '~/middlewares/carts/param.schema'
import { productIdSchema, variantIdSchema } from '~/middlewares/products/param.schema'
import { validate } from '~/utils/validate'

export const updateCartValidator = validate(
  checkSchema(
    {
      product_id: productIdSchema,
      variant_id: variantIdSchema,
      quantity: quantityCartSchema
    },
    ['body']
  )
)
