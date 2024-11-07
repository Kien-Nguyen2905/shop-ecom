import { checkSchema } from 'express-validator'
import { miniumStockSchema, productIdSchema, variantIdSchema } from '~/middlewares/products/param.schema'
import {
  importQuantitySchema,
  quantitySchema,
  shipmentSchema,
  soldSchema,
  stockSchema
} from '~/middlewares/warehouse/param.schema'
import { validate } from '~/utils/validate'

export const warehouseValidator = validate(
  checkSchema(
    {
      product_id: productIdSchema,
      variant_id: variantIdSchema,
      sold: soldSchema,
      import_quantity: importQuantitySchema,
      stock: stockSchema,
      minimum_stock: miniumStockSchema,
      shipments: shipmentSchema
    },
    ['body']
  )
)

export const warehouseUpdateValidator = validate(
  checkSchema(
    {
      quantity: quantitySchema
    },
    ['body']
  )
)
