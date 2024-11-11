import { Router } from 'express'
import { createReviewController, getReviewController } from '~/controllers/reviews.controllers'
import { adminAccessValidator } from '~/middlewares/admins/admins.middlewares'
import { createReviewValidator } from '~/middlewares/reviews/reviews.middlewares'
import { accessTokenValidator } from '~/middlewares/users/users.middlwares'

import { wrapRequestHandler } from '~/utils/handlerError'

const reviewRoute = Router()

reviewRoute.post('/', createReviewValidator, accessTokenValidator, wrapRequestHandler(createReviewController))

reviewRoute.get('/', adminAccessValidator, wrapRequestHandler(getReviewController))

export default reviewRoute
