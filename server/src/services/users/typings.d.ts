import { ObjectId } from 'mongodb'
import { ROLE, Verify } from '~/constants/enum'

export type TVerifyReqBody = {
  full_name: string
  email: string
  password: string
  confirm_password: string
}
export type TRegisterReqBody = {
  full_name: string
  email: string
  password: string
  confirm_password: string
}
export type TReSendVerifyReqBody = {
  email: string
}
export type TLoginReqBody = {
  email: string
  password: string
}
export type TDecodeEmailToken = Omit<TRegisterReqBody, 'confirm_password'>
export type TVerifyForgotReqBody = {
  password_token: string
}
export type TResetPasswordReqBody = {
  password: string
  confirm_password: string
  password_token: string
}
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
export type TVerificationEmail = {
  email: string
  token: string
  type: Verification
}
