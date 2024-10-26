import { checkSchema } from 'express-validator'
import {
  confirmPasswordSchema,
  emailLoginSchema,
  emailSchema,
  emailTokenSchema,
  fullNameSchema,
  passwordSchema
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
