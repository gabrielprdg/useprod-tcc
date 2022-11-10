import { AccountModel } from '../models/account'
import { AddAccountParams } from '../usecases/account/addAccount/add-account'

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any@mail.com',
  password: 'any_password'
})
