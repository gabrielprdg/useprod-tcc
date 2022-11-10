import { AccountModel } from '../../../../domain/models/account'
import { AddAccount, AddAccountParams } from '../../../../domain/usecases/account/addAccount/add-account'
import { Hasher } from '../../../protocols/criptography/hasher'
import { AddAccountRepository } from '../../../protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../protocols/db/account/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher
  private readonly addAccountRepository: AddAccountRepository
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  constructor (hasher: Hasher, addAccountRepository: AddAccountRepository, loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async add (accountData: AddAccountParams): Promise<AccountModel | null> {
    const loadByEmail = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!loadByEmail) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      /*
        Object.assign -> create a new object and new properties called SOURCES
        are added and if the next SOURCE has a property equal to the previous SOURCE,
        this old property is changed
      */
      const account = await this.addAccountRepository.add(Object.assign({},
        accountData,
        { password: hashedPassword }
      ))

      return account
    }
    return null
  }
}
