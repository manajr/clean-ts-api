import request from 'supertest'
import app from '../config/app'
// import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Account Mongo Repository', () => {
  /*
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  */
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'manasses',
        email: 'manasses@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
