import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { SuccessResponse } from '~/models/success/success.response'
import orderServices from '~/services/order/orders.services'

export const createOrderController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new SuccessResponse({
    data: await orderServices.createOrder({ user_id: req.decoded_token?.user_id!, ...req.body })
  }).send(res)
}

export const updateOrderController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  return new SuccessResponse({
    data: await orderServices.updateOrder(req.body)
  }).send(res)
}
