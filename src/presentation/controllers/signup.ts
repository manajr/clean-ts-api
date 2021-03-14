import { HttpRequest, HttpResponse, EmailValidator, Controller } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helper/http-helper'
import { AddAccount } from '../../domain/usecases/signup'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredField = ['name', 'email',
        'password', 'confirmationPassword']

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, confirmationPassword } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      if (password !== confirmationPassword) {
        return badRequest(new InvalidParamError('confirmationPassword'))
      }
      console.log(this.addAccount)
      this.addAccount.add({
        name,
        email,
        password
      })
      return {
        body: {},
        statusCode: 0
      }
    } catch (error) {
      return serverError()
    }
  }
}
