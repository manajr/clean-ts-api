import { AddAccountModel, Encrypter, AccountModel, AddAccountRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeFakeAccount = (): AccountModel => {
  const fakeAccout = {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    password: 'hashed_password'
  }
  return fakeAccout
}

const makeFakeAccountData = (): AddAccountModel => {
  const makeFakeAccountData = {
    name: 'valid_name',
    email: 'valid_email',
    password: 'valid_password'
  }
  return makeFakeAccountData
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = makeFakeAccount()
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncripyterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncripyterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = makeFakeAccountData()
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = makeFakeAccountData()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = makeFakeAccountData()
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = makeFakeAccountData()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('should return an account on success', async () => {
    const { sut } = makeSut()
    const accountData = makeFakeAccountData()
    const account = await sut.add(accountData)
    expect(account).toEqual(makeFakeAccount())
  })
})
