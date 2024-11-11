import { adminAccessValidator } from '~/middlewares/admins/admins.middlewares'
import { Router } from 'express'

import { createOrderController, updateOrderController } from '~/controllers/orders.controllers'
import { accessTokenValidator } from '~/middlewares/users/users.middlwares'
import { wrapRequestHandler } from '~/utils/handlerError'
import { createOrderValidator, updateOrderValidator } from '~/middlewares/orders/orders.middlewares'

const orderRoute = Router()

orderRoute.post('/', createOrderValidator, accessTokenValidator, wrapRequestHandler(createOrderController))

orderRoute.put('/', updateOrderValidator, adminAccessValidator, wrapRequestHandler(updateOrderController))

export default orderRoute
