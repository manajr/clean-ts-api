import { Router } from 'express'
import { makeSignUpController } from '../factories/signup'
import { adaptRoutes } from '../adapters/express-routes-adapter'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adaptRoutes(makeSignUpController()))
}
