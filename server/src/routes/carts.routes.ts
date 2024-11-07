import { Router } from 'express'
import { getCartController, updateCartdController } from '~/controllers/carts.controllers'
import { accessTokenValidator } from '~/middlewares/users/users.middlwares'

import { wrapRequestHandler } from '~/utils/handlerError'

const cartRoute = Router()

cartRoute.get('/', accessTokenValidator, wrapRequestHandler(getCartController))

cartRoute.put('/', accessTokenValidator, wrapRequestHandler(updateCartdController))

export default cartRoute
