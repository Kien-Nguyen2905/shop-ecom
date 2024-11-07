import { Router } from 'express'
import { getWishListController, updateWishListController } from '~/controllers/wishlists.controllers'
import { accessTokenValidator } from '~/middlewares/users/users.middlwares'
import { wrapRequestHandler } from '~/utils/handlerError'

const wishlistRoute = Router()

wishlistRoute.get('/', accessTokenValidator, wrapRequestHandler(getWishListController))

wishlistRoute.put('/', accessTokenValidator, wrapRequestHandler(updateWishListController))

export default wishlistRoute
