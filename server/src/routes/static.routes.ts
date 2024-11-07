import { Router } from 'express'
import { serveImageController } from '~/controllers/images.controllers'

const staticRouter = Router()

staticRouter.get('/image/:name', serveImageController)

export default staticRouter
