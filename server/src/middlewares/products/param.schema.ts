import { ParamSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { PRODUCT_MESSAGES } from '~/constants/message'

export const nameProductSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCT_MESSAGES.PRODUCY_NAME_REQUIRED
  },
  isString: {
    errorMessage: PRODUCT_MESSAGES.PRODUCY_NAME_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1
    },
    errorMessage: PRODUCT_MESSAGES.PRODUCY_NAME_NAME_LENGTH
  }
}
export const productIdSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCT_MESSAGES.PRODUCT_ID_REQUIRED
  },
  trim: true,
  custom: {
    options: (value) => {
      // Check if the value is a valid MongoDB ObjectId
      if (!ObjectId.isValid(value)) {
        throw new Error(PRODUCT_MESSAGES.PRODUCT_ID_INVALID)
      }
      return true
    }
  }
}
export const variantIdSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCT_MESSAGES.VARIANT_ID_REQUIRED
  },
  trim: true,
  custom: {
    options: (value) => {
      // Check if the value is a valid MongoDB ObjectId
      if (!ObjectId.isValid(value)) {
        throw new Error(PRODUCT_MESSAGES.VARIANT_ID_INVALID)
      }
      return true
    }
  }
}

export const thumbnailSchema: ParamSchema = {
  isString: {
    errorMessage: PRODUCT_MESSAGES.THUMBNAIL_MUST_BE_STRING
  },
  notEmpty: {
    errorMessage: PRODUCT_MESSAGES.THUMBNAIL_NOT_EMPTY
  },
  isURL: {
    errorMessage: PRODUCT_MESSAGES.THUMBNAIL_INVALID_URL
  },
  trim: true
}

export const descriptionSchema: ParamSchema = {
  isString: {
    errorMessage: PRODUCT_MESSAGES.DESCRIPTION_MUST_BE_STRING
  },
  notEmpty: {
    errorMessage: PRODUCT_MESSAGES.DESCRIPTION_NOT_EMPTY
  }
}

export const featuredSchema: ParamSchema = {
  isObject: {
    errorMessage: PRODUCT_MESSAGES.FEATURED_MUST_BE_OBJECT
  },
  custom: {
    options: (value) => {
      if (typeof value !== 'object' || value === null) {
        throw new Error(PRODUCT_MESSAGES.FEATURED_MUST_BE_OBJECT)
      }
      // Additional validation for each property
      const { isPopular, onSale, isRated } = value
      if (typeof isPopular !== 'boolean') {
        throw new Error(PRODUCT_MESSAGES.FEATURED_IS_POPULAR_MUST_BE_BOOLEAN)
      }
      if (typeof onSale !== 'boolean') {
        throw new Error(PRODUCT_MESSAGES.FEATURED_ON_SALE_MUST_BE_BOOLEAN)
      }
      if (typeof isRated !== 'boolean') {
        throw new Error(PRODUCT_MESSAGES.FEATURED_IS_RATED_MUST_BE_BOOLEAN)
      }
      return true
    }
  }
}

// Schema for variants array
export const variantsSchema: ParamSchema = {
  isArray: {
    errorMessage: PRODUCT_MESSAGES.VARIANTS_MUST_BE_ARRAY
  },
  custom: {
    options: (value: any[]) => {
      value.forEach((variant) => {
        if (typeof variant.color !== 'string') throw new Error(PRODUCT_MESSAGES.VARIANT_COLOR_MUST_BE_STRING)
        if (typeof variant.price !== 'number' || variant.price < 0)
          throw new Error(PRODUCT_MESSAGES.VARIANT_PRICE_POSITIVE)
        if (!Number.isInteger(variant.stock) || variant.stock < 0)
          throw new Error(PRODUCT_MESSAGES.VARIANT_STOCK_POSITIVE_INTEGER)
        if (!Number(variant.rate) || variant.rate < 0 || variant.rate > 5)
          throw new Error(PRODUCT_MESSAGES.VARIANT_RATE_BETWEEN_0_AND_5)
        if (
          !Array.isArray(variant.images) ||
          !variant.images.every((img: any) => typeof img === 'string' && img.startsWith('http'))
        ) {
          throw new Error(PRODUCT_MESSAGES.VARIANT_IMAGES_INVALID)
        }
        if (typeof variant.discount !== 'number' || variant.discount < 0 || variant.discount > 1) {
          throw new Error(PRODUCT_MESSAGES.VARIANT_DISCOUNT_BETWEEN_0_AND_1)
        }
      })
      return true
    }
  }
}

// Schema for rate
export const rateSchema: ParamSchema = {
  isInt: {
    options: { min: 0, max: 5 },
    errorMessage: PRODUCT_MESSAGES.RATE_MUST_BE_INTEGER
  }
}
export const miniumStockSchema: ParamSchema = {
  isInt: {
    options: { min: 1 },
    errorMessage: PRODUCT_MESSAGES.MINIMUM_STOCK
  }
}
export const attributeSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCT_MESSAGES.ATTRIBUTE_MUST_BE_OBJECT
  },
  isObject: {
    errorMessage: PRODUCT_MESSAGES.ATTRIBUTE_MUST_BE_OBJECT
  }
  // custom: {
  //   options: (value) => {
  //     if (typeof value !== 'object' || value === null) {
  //       throw new Error(PRODUCT_MESSAGES.ATTRIBUTE_MUST_BE_OBJECT)
  //     }

  //     const { cpu, ram, os, screen, weight, pin, demand } = value

  //     if (typeof cpu !== 'string' || cpu.trim() === '') {
  //       throw new Error(PRODUCT_MESSAGES.ATTRIBUTE_CPU_NON_EMPTY)
  //     }

  //     if (typeof ram !== 'string' || ram.trim() === '') {
  //       throw new Error(PRODUCT_MESSAGES.ATTRIBUTE_RAM_NON_EMPTY)
  //     }

  //     if (typeof os !== 'string' || os.trim() === '') {
  //       throw new Error(PRODUCT_MESSAGES.ATTRIBUTE_OS_NON_EMPTY)
  //     }

  //     if (typeof screen !== 'number') {
  //       throw new Error(PRODUCT_MESSAGES.ATTRIBUTE_SCREEN_MUST_BE_NUMBER)
  //     }

  //     if (typeof weight !== 'number' || !Number.isInteger(weight)) {
  //       throw new Error(PRODUCT_MESSAGES.ATTRIBUTE_WEIGHT_MUST_BE_INTEGER)
  //     }

  //     if (typeof pin !== 'string' || pin.trim() === '') {
  //       throw new Error(PRODUCT_MESSAGES.ATTRIBUTE_PIN_NON_EMPTY)
  //     }

  //     if (!Array.isArray(demand) || !demand.every((item) => typeof item === 'string' && item.trim() !== '')) {
  //       throw new Error(PRODUCT_MESSAGES.ATTRIBUTE_DEMAND_ARRAY)
  //     }

  //     return true // All validations passed
  //   }
  // }
}
