import { Router } from 'express'
import { serveImageController } from '~/controllers/images.controllers'

const staticRoute = Router()

staticRoute.get('/image/:name', serveImageController)

export default staticRoute
