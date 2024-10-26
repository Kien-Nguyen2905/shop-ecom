import { Router } from 'express'
import {
  loginController,
  logoutController,
  registerController,
  verifyEmailController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  verifyEmailValidator
} from '~/middlewares/users/users.middlwares'
import { wrapRequestHandler } from '~/utils/handlerError'

const userRoute = Router()
userRoute.post('/verify-email', verifyEmailValidator, wrapRequestHandler(verifyEmailController))
userRoute.post('/register', registerValidator, wrapRequestHandler(registerController))
userRoute.post('/login', loginValidator, wrapRequestHandler(loginController))
userRoute.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
export default userRoute
