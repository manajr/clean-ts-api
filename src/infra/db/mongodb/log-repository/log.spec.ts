import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

describe('Log Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  const makeLogMongoRepository = (): LogMongoRepository => {
    return new LogMongoRepository()
  }

  test('Should create an error log on success', async () => {
    const sut = makeLogMongoRepository()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
