import bcrypt from 'bcrypt'
import { BcryptAdapter } from '../protocols/BcryptAdapter'

const SALT = 12

interface SutTypes {
  sut: BcryptAdapter
}

const makeSut = (): SutTypes => {
  const salt = SALT
  const sut = new BcryptAdapter(salt)
  return { sut }
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const { sut } = makeSut()
    const spyEncrypt = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(spyEncrypt).toHaveBeenCalledWith('any_value', SALT)
  })
})
