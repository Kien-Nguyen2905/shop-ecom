import { Router } from 'express'
import { getTransactionSePayController } from '~/controllers/transactions.controllers'
import { accessTokenValidator } from '~/middlewares/users/users.middlwares'
import { wrapRequestHandler } from '~/utils/handlerError'
const transactionRoute = Router()

transactionRoute.get('/webhook/seepay', accessTokenValidator, wrapRequestHandler(getTransactionSePayController))

export default transactionRoute
