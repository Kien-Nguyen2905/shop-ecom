import { Router } from 'express'
import {
  loginController,
  logoutController,
  registerController,
  verifyEmailController,
  reSendVerifyController,
  reSendForgotController,
  forgotPasswordController,
  resetPasswordController,
  getProfileController,
  refreshTokenController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  verifyEmailValidator,
  reSendVerifyValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} from '~/middlewares/users/users.middlwares'
import { wrapRequestHandler } from '~/utils/handlerError'

const userRoute = Router()

userRoute.post('/verify-email', verifyEmailValidator, wrapRequestHandler(verifyEmailController))

userRoute.post('/resend-verify', reSendVerifyValidator, wrapRequestHandler(reSendVerifyController))

userRoute.post('/register', registerValidator, wrapRequestHandler(registerController))

userRoute.post('/login', loginValidator, wrapRequestHandler(loginController))

userRoute.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

userRoute.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

userRoute.post('/resend-forgot', forgotPasswordValidator, wrapRequestHandler(reSendForgotController))

userRoute.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

userRoute.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

userRoute.get('/profile', accessTokenValidator, wrapRequestHandler(getProfileController))

export default userRoute
