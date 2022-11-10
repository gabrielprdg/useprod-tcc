import { AccountModel } from '../../../../domain/models/account'
import { AddAccountParams } from '../../../../domain/usecases/account/addAccount/add-account'

export interface AddAccountRepository {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
