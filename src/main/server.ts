import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(String(env.mongoUrl))
  .then(async () => {
    const app = await (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
