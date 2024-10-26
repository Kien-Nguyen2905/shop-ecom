import { Request } from 'express'
import { TDecodeEmailToken } from '~/services/users/typings'
declare module 'express' {
  interface Request {
    decoded_email_verify_token?: TDecodeEmailToken
  }
}
