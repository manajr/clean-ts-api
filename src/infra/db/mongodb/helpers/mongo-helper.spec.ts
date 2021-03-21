import { MongoHelper } from './mongo-helper'

beforeAll(async () => {
  await MongoHelper.connect(String(process.env.MONGO_URL))
})

afterAll(async () => {
  await MongoHelper.disconnect()
})

describe('MongoHelper', () => {
  test('should reconnect when getCollections if connection is down', async () => {
    let sut = await MongoHelper.getCollection('accounts')
    expect(sut).toBeTruthy()
    await MongoHelper.disconnect()
    sut = await MongoHelper.getCollection('accounts')
    expect(sut).toBeTruthy()
  })
})
