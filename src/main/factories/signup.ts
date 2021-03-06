import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/BcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/singup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorator/log'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const logMongoRepository = new LogMongoRepository()
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
