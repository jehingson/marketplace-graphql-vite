import { gql } from 'apollo-server-express'
import { accountService } from '../services'


export const AccountsTypeDefs = gql`
  type Accounts {
    id: String
    email: String
    username: String
    status: String
    authToken: String
    success: Boolean
    message: String
    picture: String
    email_verified: Boolean
    role: String
  } 

  extend type Query {
    getProfile: Accounts
  }
  
  extend type Mutation {
    login(email: String, password: String, iv: String): Accounts
    googleRegister(token: String): Accounts
    register(username: String, email: String, password: String, iv: String): Accounts
    updateAccount(password: String, iv: String, username: String): operationResult
    logout: operationResult
  }
`

export const AccountsResolvers = {
  Query: {
    getProfile: (_, __, { account }) => accountService.getProfile(account?.id ?? '')
  },
  Mutation: {
    login: (_, args) => accountService.login(args),
    register: (_, args) => accountService.register(args),
    googleRegister: (_, args) => accountService.googleRegister(args),
    updateAccount: (_, args, { account }) => accountService.updateAccount({...args, accountId: account?.id ?? ''}),
    logout: (_, __, { account }) => accountService.logout(account?.id ?? '')
  }
}