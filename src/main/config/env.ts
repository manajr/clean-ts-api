import dotenv from 'dotenv'

dotenv.config()

const mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.MONGO_URL ?? 'mongodb://localhost:27017/tempNode'
  : process.env.PRODUCTION_MONGODB_URL

export default {
  mongoUrl: mongoUrl,
  port: process.env.PORT ?? 5050
}
