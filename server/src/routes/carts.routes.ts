import { Router } from 'express'
import { getCartController, removeCartdController, updateCartdController } from '~/controllers/carts.controllers'
import { updateCartValidator } from '~/middlewares/carts/carts.middlewares'
import { accessTokenValidator } from '~/middlewares/users/users.middlwares'

import { wrapRequestHandler } from '~/utils/handlerError'

const cartRoute = Router()

cartRoute.get('/', accessTokenValidator, wrapRequestHandler(getCartController))

cartRoute.put('/', updateCartValidator, accessTokenValidator, wrapRequestHandler(updateCartdController))

cartRoute.delete('/', accessTokenValidator, wrapRequestHandler(removeCartdController))

export default cartRoute
