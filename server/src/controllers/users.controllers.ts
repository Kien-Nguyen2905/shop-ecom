import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/message'
import User from '~/models/schemas/users/users.schemas'
import userServices from '~/services/users/users.services'
export const registerController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const result = await userServices.register(req.body.email_token)
  return res.status(201).json({ message: USERS_MESSAGES.REGISTER_SUCCEED, result })
}
export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const result = await userServices.verifyEmail(req.body)
  return res.status(200).json({ result })
}
export const loginController = async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
  const result = await userServices.login(req.body)
  return res.status(200).json({ message: USERS_MESSAGES.LOGIN_SUCCEED, result })
}
export const logoutController = async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
  await userServices.logout(req.body.refresh_token)
  return res.status(200).json({ message: USERS_MESSAGES.LOGOUT_SUCCEED })
}
