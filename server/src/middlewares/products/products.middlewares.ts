import { checkSchema } from 'express-validator'
import { brandIdSchema } from '~/middlewares/brands/parma.schema'
import { categoryIdSchema } from '~/middlewares/categories/param.schema'
import {
  attributeSchema,
  descriptionSchema,
  featuredSchema,
  miniumStockSchema,
  nameProductSchema,
  productIdSchema,
  rateSchema,
  thumbnailSchema,
  variantsSchema
} from '~/middlewares/products/param.schema'
import { validate } from '~/utils/validate'

export const productValidator = validate(
  checkSchema(
    {
      name: nameProductSchema,
      category_id: categoryIdSchema,
      brand_id: brandIdSchema,
      thumbnail: thumbnailSchema,
      description: descriptionSchema,
      featured: featuredSchema,
      variants: variantsSchema,
      rate: rateSchema,
      minimum_stock: miniumStockSchema,
      attribute: attributeSchema
    },
    ['body']
  )
)
export const productParmaValidator = validate(
  checkSchema(
    {
      id: productIdSchema
    },
    ['params']
  )
)