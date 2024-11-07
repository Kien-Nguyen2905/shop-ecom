import { Router } from 'express'
import { uploadImageController } from '~/controllers/images.controllers'
import { wrapRequestHandler } from '~/utils/handlerError'
const imagesRouter = Router()

imagesRouter.post('/upload-image', wrapRequestHandler(uploadImageController))

export default imagesRouter
