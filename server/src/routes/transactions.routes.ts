import { Router } from 'express'
import {
  createTransactionController,
  getAllTransactionController,
  getTransactionSePayController
} from '~/controllers/transactions.controllers'
import { adminAccessValidator } from '~/middlewares/admins/admins.middlewares'
import { accessTokenValidator } from '~/middlewares/users/users.middlwares'
import { wrapRequestHandler } from '~/utils/handlerError'
const transactionRoute = Router()

transactionRoute.get('/webhook/seepay', accessTokenValidator, wrapRequestHandler(getTransactionSePayController))

transactionRoute.get('/', adminAccessValidator, wrapRequestHandler(getAllTransactionController))

transactionRoute.post('/', accessTokenValidator, wrapRequestHandler(createTransactionController))

export default transactionRoute
