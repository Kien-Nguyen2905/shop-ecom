import { adminAccessValidator } from '~/middlewares/admins/admins.middlewares'
import { Router } from 'express'

import {
  cancleOrderController,
  checkStockController,
  createOrderController,
  getOrderByUserController,
  getOrderController,
  getRevenueOrderController,
  updateOrderController
} from '~/controllers/orders.controllers'
import { accessTokenValidator } from '~/middlewares/users/users.middlwares'
import { wrapRequestHandler } from '~/utils/handlerError'
import { createOrderValidator, updateOrderValidator } from '~/middlewares/orders/orders.middlewares'

const orderRoute = Router()

orderRoute.post('/', createOrderValidator, accessTokenValidator, wrapRequestHandler(createOrderController))

orderRoute.put('/:id', accessTokenValidator, wrapRequestHandler(cancleOrderController))

orderRoute.put('/', updateOrderValidator, adminAccessValidator, wrapRequestHandler(updateOrderController))

orderRoute.get('/', accessTokenValidator, wrapRequestHandler(getOrderByUserController))

orderRoute.get('/all', accessTokenValidator, adminAccessValidator, wrapRequestHandler(getOrderController))

orderRoute.get('/revenue', adminAccessValidator, wrapRequestHandler(getRevenueOrderController))

export default orderRoute
