import { Router } from 'express'
import { registerController, verifyEmailController } from '~/controllers/users.controllers'
import { registerValidator, verifyEmailValidator } from '~/middlewares/users/users.middlwares'
import { wrapRequestHandler } from '~/utils/handlerError'

const userRoute = Router()
userRoute.post('/verify-email', verifyEmailValidator, wrapRequestHandler(verifyEmailController))
userRoute.post('/register', registerValidator, wrapRequestHandler(registerController))
export default userRoute
