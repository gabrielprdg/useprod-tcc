import { AccountModel } from '../../domain/models/account'
import { mockAccountModel } from '../../domain/test/mock-account'
import { Authentication, AuthenticationParams } from '../../domain/usecases/account/addAccount/authentication'
import {
  AddAccount,
  AddAccountParams
} from '../../domain/usecases/account/addAccount/add-account'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }

  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }

  return new AuthenticationStub()
}
