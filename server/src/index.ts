import express from 'express'
import { env } from 'process'
import { defaultErrorHandler } from '~/middlewares/error.middlewares'
import userRoute from '~/routes/users.routes'
import databaseService from '~/services/database/database.services'
const app = express()
const port = env.PORT || 8080
databaseService.connect()
app.use(express.json())
app.use(`${env.API_VERSION}/users`, userRoute)

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
