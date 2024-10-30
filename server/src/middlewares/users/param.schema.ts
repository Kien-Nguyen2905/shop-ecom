import { ParamSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { env } from '~/configs/environment'
import { HTTP_STATUS } from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/errors'
import { TDecodeEmailToken } from '~/services/users/typings'
import userServices from '~/services/users/users.services'
import { verifyToken } from '~/utils/jwt'

export const fullNameSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.NAME_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.NAME_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: USERS_MESSAGES.NAME_LENGTH
  }
}
export const emailVerifySchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.EMAIL_REQUIRED
  },
  isEmail: {
    errorMessage: USERS_MESSAGES.EMAIL_INVALID
  },
  trim: true,
  custom: {
    options: async (value) => {
      // check email exist
      const isExistEmail = await userServices.checkEmailExist(value)
      if (isExistEmail) {
        throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS)
      }
      return true
    }
  }
}
export const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.PASSWORD_REQUIRED
  },
  isString: {
    errorMessage: USERS_MESSAGES.PASSWORD_STRING
  },
  trim: true
  // isLength: {
  //   options: {
  //     min: 6,
  //     max: 50
  //   },
  //   errorMessage: USERS_MESSAGES.PASSWORD_LENGTH
  // },
  // isStrongPassword: {
  //   options: {
  //     minLength: 6,
  //     minLowercase: 1,
  //     minUppercase: 1,
  //     minNumbers: 1,
  //     minSymbols: 1
  //   },
  //   errorMessage: USERS_MESSAGES.PASSWORD_STRONG
  // }
}
export const confirmPasswordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_REQUIRED
  },
  trim: true,
  custom: {
    options: (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
      }
      return true
    }
  }
}
export const emailTokenSchema: ParamSchema = {
  notEmpty: { errorMessage: USERS_MESSAGES.TOKEN_EMAIL_VERIFY },
  custom: {
    options: async (value) => {
      try {
        const user_payload = await verifyToken<TDecodeEmailToken>({
          token: value,
          secretOrPublicKey: env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
        })
        const created_email = await userServices.checkEmailExist(user_payload.email)
        if (created_email) {
          throw new Error(USERS_MESSAGES.EMAIL_VERIFIED)
        }
      } catch (error) {
        throw new ErrorWithStatus({
          message: (error as JsonWebTokenError).message,
          status: HTTP_STATUS.UNAUTHORIZED
        })
      }
    }
  }
}
export const emailSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.EMAIL_REQUIRED
  },
  isEmail: {
    errorMessage: USERS_MESSAGES.EMAIL_INVALID
  },
  trim: true
}

export const accessTokenSchema: ParamSchema = {
  custom: {
    options: async (value: string) => {
      const access_token = (value || '').split(' ')[1]
      if (!access_token) {
        throw new ErrorWithStatus({
          message: USERS_MESSAGES.ACCESS_TOKEN_REQUIRED,
          status: HTTP_STATUS.UNAUTHORIZED
        })
      }
      try {
        await verifyToken({
          token: access_token,
          secretOrPublicKey: env.JWT_SECRET_ACCESS_TOKEN as string
        })
      } catch (error) {
        throw new ErrorWithStatus({
          message: (error as JsonWebTokenError).message,
          status: HTTP_STATUS.UNAUTHORIZED
        })
      }
      return true
    }
  }
}
export const refreshTokenSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.REFRESH_TOKEN_REQUIRED
  },
  custom: {
    options: async (value: string) => {
      try {
        await verifyToken({
          token: value,
          secretOrPublicKey: env.JWT_SECRET_REFRESH_TOKEN as string
        })
      } catch (error) {
        throw new ErrorWithStatus({
          message: (error as JsonWebTokenError).message,
          status: HTTP_STATUS.UNAUTHORIZED
        })
      }
      return true
    }
  }
}
export const passwordTokenSchema: ParamSchema = {
  notEmpty: {
    errorMessage: USERS_MESSAGES.PASSWORD_TOKEN_REQUIRED
  }
}
