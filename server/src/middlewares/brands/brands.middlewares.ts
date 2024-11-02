import { checkSchema } from 'express-validator'
import { brandIdSchema, brandNameSchema } from '~/middlewares/brands/parma.schema'
import { validate } from '~/utils/validate'

export const brandValidator = validate(
  checkSchema(
    {
      name: brandNameSchema
    },
    ['body']
  )
)
export const updatebrandlValidator = validate(
  checkSchema(
    {
      name: brandNameSchema
    },
    ['body', 'params']
  )
)
export const brandParamValidator = validate(
  checkSchema(
    {
      id: brandIdSchema
    },
    ['params']
  )
)
