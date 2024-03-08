"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const typedi_1 = require("typedi");
const bcrypt_1 = __importDefault(require("bcrypt"));
const accounts_model_1 = require("../models/accounts.model");
const data_source_1 = require("../../boot/data-source");
const uuid_1 = require("uuid");
// import { Mailer } from '../../utils/mailer';
// import { mailConfig } from '../../config/mail';
// import { appConfig } from '../../config/app';
const token_1 = require("../../libreries/token");
const status_enum_1 = require("../enum/status.enum");
const encrypto_1 = require("../../utils/encrypto");
const accounts_token_model_1 = require("../models/accounts-token.model");
const google_auth_library_1 = require("google-auth-library");
const graphql_1 = require("graphql");
const client = new google_auth_library_1.OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
let AccountService = class AccountService {
    constructor() {
        this.responseAccounts = (account) => __awaiter(this, void 0, void 0, function* () {
            const authToken = (0, token_1.generateAuthToken)({
                id: account.id,
                modelName: "accounts",
            });
            const tokenLibrary = new token_1.TokenLibrary();
            yield tokenLibrary.saveUserToken({
                pushToken: "",
                authToken,
                version: "1.0.0",
                account: account,
            });
            delete account.password;
            return Object.assign(Object.assign({}, account), { authToken, success: true, message: "" });
        });
        this.createRegister = ({ username, email, password, iv, picture }, accountRepository) => __awaiter(this, void 0, void 0, function* () {
            try {
                const account = new accounts_model_1.Accounts();
                account.id = (0, uuid_1.v4)();
                account.email = email;
                account.username = username;
                // account.picture = picture ? picture : ""
                // account.email_verified = 0
                const dePassword = iv ? (0, encrypto_1.decrypt)(password, iv) : password;
                const hash = yield bcrypt_1.default.hash(dePassword, 10);
                account.password = hash.replace("$2a$", "$2y$");
                yield accountRepository.save(account);
                // try {
                //   // msg email
                //   const mailer = new Mailer
                //   await mailer.sendMail({
                //     template: 'welcome-email',
                //     to: account.email,
                //     from: mailConfig.user,
                //     context: {
                //       account,
                //       app: appConfig,
                //     },
                //   });
                // } catch (error) {
                //   console.log('createAccount', error)
                // }
                return this.responseAccounts(account);
            }
            catch (error) {
                console.log("createRegister error", error);
                return { success: false, message: error.message };
            }
        });
        this.login = ({ email, password, iv }) => __awaiter(this, void 0, void 0, function* () {
            const accountRepository = data_source_1.AppDataSource.getRepository(accounts_model_1.Accounts);
            const account = yield accountRepository.findOneBy({ email: email });
            if (!account) {
                throw new graphql_1.GraphQLError("El correo electrónico o la contraseña son incorrectos");
            }
            if (account.status !== status_enum_1.Status.Active) {
                throw new graphql_1.GraphQLError("El usuario se encuentra activo.");
            }
            try {
                const hash = account.password.replace("$2y$", "$2a$");
                const dePassword = (0, encrypto_1.decrypt)(password, iv);
                yield bcrypt_1.default.compare(dePassword, hash);
                return this.responseAccounts(account);
            }
            catch (error) {
                throw new graphql_1.GraphQLError("El correo electrónico o la contraseña son incorrectos");
            }
        });
        this.register = ({ username, email, password, iv }) => __awaiter(this, void 0, void 0, function* () {
            const accountRepository = data_source_1.AppDataSource.getRepository(accounts_model_1.Accounts);
            const exitsAccount = yield accountRepository.findOneBy({ email });
            if (exitsAccount)
                throw new graphql_1.GraphQLError("El correo electrónico se encuentra registrado.");
            return this.createRegister({ username, email, password, iv, picture: "" }, accountRepository);
        });
        this.googleRegister = ({ token }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const ticket = yield client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const data = (_a = ticket === null || ticket === void 0 ? void 0 : ticket.payload) !== null && _a !== void 0 ? _a : null;
                const { name: username, email, picture } = data;
                const accountRepository = data_source_1.AppDataSource.getRepository(accounts_model_1.Accounts);
                const account = yield accountRepository.findOneBy({ email });
                if (account) {
                    return this.responseAccounts(account);
                }
                const password = (0, uuid_1.v4)();
                return this.createRegister({ username, email, password, iv: null, picture }, accountRepository);
            }
            catch (error) {
                console.log("errror", error);
                return { message: "", success: false };
            }
        });
        this.getProfile = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const accountRepository = data_source_1.AppDataSource.getRepository(accounts_model_1.Accounts);
            const account = yield accountRepository.findOneBy({ id: accountId });
            if (!account)
                return { success: false, message: "" };
            delete account.password;
            return Object.assign(Object.assign({}, account), { authToken: "", success: true, message: "" });
        });
        this.updateAccount = (args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, status, password, iv, accountId, role, authToken } = args;
                if (!accountId)
                    return { success: false, message: "" };
                let account = {};
                if (username)
                    account["username"] = username;
                if (status)
                    account["status"] = status;
                if (role)
                    account["role"] = role;
                if (password && iv) {
                    const dePassword = (0, encrypto_1.decrypt)(password, iv);
                    const hash = yield bcrypt_1.default.hash(dePassword, 10);
                    account["password"] = hash.replace("$2a$", "$2y$");
                }
                const accountRepository = data_source_1.AppDataSource.getRepository(accounts_model_1.Accounts);
                yield accountRepository.update({
                    id: accountId,
                }, account);
                const newAccount = yield this.getProfile(accountId);
                return Object.assign(Object.assign({ success: true, message: "" }, newAccount), { authToken });
            }
            catch (error) {
                throw new graphql_1.GraphQLError("Algo a salido mal, vuelve a intentar.");
            }
        });
        this.logout = (accountId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenRepository = data_source_1.AppDataSource.getRepository(accounts_token_model_1.AccountsToken);
                yield tokenRepository.update({
                    account: {
                        id: accountId,
                    },
                }, {
                    status: status_enum_1.Status.Deleted,
                });
                return { success: true, message: "" };
            }
            catch (error) {
                return { success: false, message: "" };
            }
        });
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, typedi_1.Service)()
], AccountService);
