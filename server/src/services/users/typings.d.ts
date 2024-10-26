import { ObjectId } from 'mongodb'
import { ROLE } from '~/constants/enum'

export type TRegisterReqBody = {
  full_name: string
  email: string
  password: string
  confirm_password: string
}
export type TDecodeEmailToken = Omit<TRegisterReqBody, 'confirm_password'>
export interface IAccessToken {
  user_id: ObjectId
  role: ROLE
}
export interface IRefreshToken extends IAccessToken {
  exp?: number
}
export interface ITokenVerify extends IRefreshToken {
  iat: number
}
