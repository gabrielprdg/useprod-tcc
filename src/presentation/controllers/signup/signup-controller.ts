import { AddAccount } from '../../../domain/usecases/account/addAccount/add-account'
import { Authentication } from '../../../domain/usecases/account/addAccount/authentication'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (addAccount: AddAccount, validation: Validation, authentication: Authentication) {
    this.addAccount = addAccount
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        name,
        email,
        password
      } = httpRequest.body

      const account = await this.addAccount.add({ name, email, password })

      return ok({ account })
    // eslint-disable-next-line no-unreachable
    } catch (err) {
      return serverError(err)
    }
  }
}
