import { AddAccount } from '../../../domain/usecases/account/addAccount/add-account'
import { Authentication } from '../../../domain/usecases/account/addAccount/authentication'
import { EmailInUseError } from '../../errors/email-in-use-error'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http/http-helper'
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
      const error = await this.validation.validate(httpRequest.body)
      if (error != null) {
        return badRequest(error)
      }

      const {
        name,
        email,
        password
      } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return ok({ accessToken })
    // eslint-disable-next-line no-unreachable
    } catch (err) {
      return serverError(err)
    }
  }
}
