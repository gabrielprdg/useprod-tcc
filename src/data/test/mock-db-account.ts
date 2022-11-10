import { AccountModel } from '../../domain/models/account'
import { mockAccountModel } from '../../domain/test/mock-account'
import { AddAccountParams } from '../../domain/usecases/account/addAccount/add-account'
import { AddAccountRepository } from '../protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }

  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await Promise.resolve(null)
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}
