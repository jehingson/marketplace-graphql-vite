"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsResolvers = exports.AccountsTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const services_1 = require("../services");
exports.AccountsTypeDefs = (0, apollo_server_express_1.gql) `
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
    updateAccount(password: String, iv: String, username: String, role: String): Accounts
    logout: operationResult
  }
`;
exports.AccountsResolvers = {
    Query: {
        getProfile: (_, __, { account }) => { var _a; return services_1.accountService.getProfile((_a = account === null || account === void 0 ? void 0 : account.id) !== null && _a !== void 0 ? _a : ''); }
    },
    Mutation: {
        login: (_, args) => services_1.accountService.login(args),
        register: (_, args) => services_1.accountService.register(args),
        googleRegister: (_, args) => services_1.accountService.googleRegister(args),
        updateAccount: (_, args, { account, authToken }) => { var _a; return services_1.accountService.updateAccount(Object.assign(Object.assign({}, args), { accountId: (_a = account === null || account === void 0 ? void 0 : account.id) !== null && _a !== void 0 ? _a : '', authToken })); },
        logout: (_, __, { account }) => { var _a; return services_1.accountService.logout((_a = account === null || account === void 0 ? void 0 : account.id) !== null && _a !== void 0 ? _a : ''); }
    }
};
