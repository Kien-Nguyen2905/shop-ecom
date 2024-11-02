import express from 'express'
import { env } from '~/configs/environment'
import { defaultErrorHandler } from '~/middlewares/error.middlewares'
import addressRoute from '~/routes/address.routes'
import categoryRoute from '~/routes/categories.routes'
import userRoute from '~/routes/users.routes'
import databaseService from '~/services/database/database.services'
const app = express()
const port = env.PORT || 8080
databaseService.connect()
app.use(express.json())
app.use(`${env.API_VERSION}/users`, userRoute)
app.use(`${env.API_VERSION}/address`, addressRoute)
app.use(`${env.API_VERSION}/category`, categoryRoute)

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
