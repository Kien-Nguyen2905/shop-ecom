import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import userServices from '~/services/users/users.services'
export const registerController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const result = await userServices.register(req.body.email_token)
  return res.status(201).json({ result })
}
export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const result = await userServices.verifyEmail(req.body)
  return res.status(200).json({ result })
}
