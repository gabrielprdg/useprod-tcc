import { AddAccount } from '../../../domain/usecases/account/addAccount/add-account'
import { Authentication } from '../../../domain/usecases/account/addAccount/authentication'
import { ServerError } from '../../errors/server-error'
import { serverError } from '../../helpers/http/http-helper'
import { HttpRequest } from '../../protocols/http'
import { Validation } from '../../protocols/validation'
import { mockAddAccount, mockAuthentication } from '../../test/mock-account'
import { mockValidation } from '../../test/mock-validation'
import { SignUpController } from './signup-controller'

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password_confirmation'
  }
})

describe('SignUp Controller', () => {
  it('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      // eslint-disable-next-line @typescript-eslint/return-await
      return Promise.reject(new Error())
    })

    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
})
