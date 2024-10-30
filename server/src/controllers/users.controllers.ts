import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/message'
import { CREATED, SuccessResponse } from '~/models/success/success.response'
import userServices from '~/services/users/users.services'
export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new SuccessResponse({
    data: await userServices.verifyEmail(req.body)
  }).send(res)
}
export const reSendVerifyController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new SuccessResponse({
    data: await userServices.reSendVerifyEmail(req.body.email)
  }).send(res)
}
export const registerController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new CREATED({
    message: USERS_MESSAGES.REGISTER_SUCCEED,
    data: await userServices.register(req.body.email_token)
  }).send(res)
}

export const loginController = async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
  return new SuccessResponse({
    message: USERS_MESSAGES.LOGIN_SUCCEED,
    data: await userServices.login(req.body)
  }).send(res)
}
export const logoutController = async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
  await userServices.logout(req.body.refresh_token)
  return new SuccessResponse({
    message: USERS_MESSAGES.LOGOUT_SUCCEED,
    data: await userServices.logout(req.body.refresh_token)
  }).send(res)
}
export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new SuccessResponse({
    message: USERS_MESSAGES.SEND_FORGOT_SUCCED,
    data: await userServices.forgotPassword(req.body.email)
  }).send(res)
}
export const reSendForgotController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new SuccessResponse({
    message: USERS_MESSAGES.RESEND_FORGOT_SUCCED,
    data: await userServices.reSendForgot(req.body.email)
  }).send(res)
}
export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new SuccessResponse({
    message: USERS_MESSAGES.RESET_PASSWORD_SUCCED,
    data: await userServices.resetPassword(req.body)
  }).send(res)
}
