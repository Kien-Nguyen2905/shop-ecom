import { Request } from 'express'
import User from '~/models/schemas/users/users.schemas'
import { TDecodeEmailToken } from '~/services/users/typings'
declare module 'express' {
  interface Request {
    user?: User
    decoded_email_verify_token?: TDecodeEmailToken
  }
}
