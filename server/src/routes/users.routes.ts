import { Router } from 'express'
import { loginController, registerController, verifyEmailController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator, verifyEmailValidator } from '~/middlewares/users/users.middlwares'
import { wrapRequestHandler } from '~/utils/handlerError'

const userRoute = Router()
userRoute.post('/verify-email', verifyEmailValidator, wrapRequestHandler(verifyEmailController))
userRoute.post('/register', registerValidator, wrapRequestHandler(registerController))
userRoute.post('/login', loginValidator, wrapRequestHandler(loginController))
export default userRoute
