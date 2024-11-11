import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { SuccessResponse } from '~/models/success/success.response'
import transactionServices from '~/services/transaction/transactions.services'
export const getTransactionSePayController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { content, value } = req.query
  return new SuccessResponse({
    data: await transactionServices.getTransactionSePay({
      content: content as string,
      value: value as string,
      user_id: req.decoded_token?.user_id!
    })
  }).send(res)
}
