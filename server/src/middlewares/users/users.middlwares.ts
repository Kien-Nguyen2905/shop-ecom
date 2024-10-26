import { checkSchema } from 'express-validator'
import {
  accessTokenSchema,
  confirmPasswordSchema,
  emailLoginSchema,
  emailSchema,
  emailTokenSchema,
  fullNameSchema,
  passwordSchema,
  refreshTokenSchema
} from '~/middlewares/users/param.schema'
import { validate } from '~/utils/validate'

export const registerValidator = validate(
  checkSchema(
    {
      email_token: emailTokenSchema
    },
    ['body']
  )
)
export const verifyEmailValidator = validate(
  checkSchema(
    {
      full_name: fullNameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirm_password: confirmPasswordSchema
    },
    ['body']
  )
)
export const loginValidator = validate(
  checkSchema(
    {
      email: emailLoginSchema,
      password: passwordSchema
    },
    ['body']
  )
)
export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: accessTokenSchema
    },
    ['headers']
  )
)
export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: refreshTokenSchema
    },
    ['body']
  )
)
