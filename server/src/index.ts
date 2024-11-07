import express from 'express'
import { env } from '~/configs/environment'
import { defaultErrorHandler } from '~/middlewares/error.middlewares'
import addressRoute from '~/routes/address.routes'
import brandRoute from '~/routes/brands.routes'
import cartRoute from '~/routes/carts.routes'
import categoryRoute from '~/routes/categories.routes'
import imagesRouter from '~/routes/images.routes'
import productRoute from '~/routes/products.routes'
import staticRouter from '~/routes/static.routes'
import userRoute from '~/routes/users.routes'
import warehouseRoute from '~/routes/warehouse.routes'
import wishlistRoute from '~/routes/wishlists.routes'
import databaseService from '~/services/database/database.services'
import { initFolder } from '~/utils/file'
const app = express()
const port = env.PORT || 8080
databaseService.connect()
app.use(express.json())
initFolder()

app.use(`${env.API_VERSION}/users`, userRoute)
app.use(`${env.API_VERSION}/address`, addressRoute)
app.use(`${env.API_VERSION}/category`, categoryRoute)
app.use(`${env.API_VERSION}/brand`, brandRoute)
app.use(`${env.API_VERSION}/product`, productRoute)
app.use(`${env.API_VERSION}/warehouse`, warehouseRoute)
app.use(`${env.API_VERSION}/cart`, cartRoute)
app.use(`${env.API_VERSION}/wishlist`, wishlistRoute)
app.use(`${env.API_VERSION}/images`, imagesRouter)
app.use(`${env.API_VERSION}/static`, staticRouter)

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
