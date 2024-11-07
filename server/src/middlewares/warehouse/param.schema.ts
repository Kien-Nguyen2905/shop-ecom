import { ParamSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { WAREHOUSE_MESSAGES } from '~/constants/message'

export const soldSchema: ParamSchema = {
  isInt: {
    options: { min: 0 },
    errorMessage: WAREHOUSE_MESSAGES.INVALID_SOLD_VALUE
  },
  toInt: true,
  optional: true
}
export const importQuantitySchema: ParamSchema = {
  isInt: {
    options: { min: 0 },
    errorMessage: WAREHOUSE_MESSAGES.INVALID_IMPORT_QUANTITY
  },
  toInt: true,
  optional: true
}

// Schema for stock
export const stockSchema: ParamSchema = {
  isInt: {
    options: { min: 0 },
    errorMessage: WAREHOUSE_MESSAGES.INVALID_STOCK_VALUE
  },
  toInt: true,
  notEmpty: {
    errorMessage: WAREHOUSE_MESSAGES.STOCK_REQUIRED
  }
}

// Schema for minimum_stock
export const miniumStockSchema: ParamSchema = {
  isInt: {
    options: { min: 1 },
    errorMessage: WAREHOUSE_MESSAGES.INVALID_MINIMUM_STOCK_VALUE
  },
  toInt: true,
  optional: true
}

// Schema for shipments
export const shipmentSchema: ParamSchema = {
  isArray: {
    errorMessage: WAREHOUSE_MESSAGES.SHIPMENTS_MUST_BE_ARRAY
  },
  custom: {
    options: (value: any[]) => {
      value.forEach((shipment) => {
        if (typeof shipment !== 'object' || shipment === null) {
          throw new Error(WAREHOUSE_MESSAGES.INVALID_SHIPMENT_ITEM)
        }
        if (typeof shipment.quantity !== 'number' || shipment.quantity < 0) {
          throw new Error(WAREHOUSE_MESSAGES.INVALID_SHIPMENT_QUANTITY)
        }
        if (typeof shipment.date !== 'string' || isNaN(Date.parse(shipment.date))) {
          throw new Error(WAREHOUSE_MESSAGES.INVALID_SHIPMENT_DATE)
        }
      })
      return true
    }
  },
  optional: true
}
export const quantitySchema: ParamSchema = {
  notEmpty: {
    errorMessage: WAREHOUSE_MESSAGES.QUANTITY_REQUIRED
  },
  isNumeric: {
    errorMessage: WAREHOUSE_MESSAGES.QUANTITY_NUMERIC
  },
  isLength: {
    options: {
      min: 1
    },
    errorMessage: WAREHOUSE_MESSAGES.QUANTITY_MIN
  }
}
