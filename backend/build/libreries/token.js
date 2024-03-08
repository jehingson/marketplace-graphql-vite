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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenLibrary = exports.generateAuthToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const status_enum_1 = require("../app/enum/status.enum");
const typedi_1 = require("typedi");
const accounts_token_model_1 = require("../app/models/accounts-token.model");
const data_source_1 = require("../boot/data-source");
const generateAccessToken = () => (0, jsonwebtoken_1.sign)({}, process.env.JWT_SECRET);
exports.generateAccessToken = generateAccessToken;
const generateAuthToken = (jwtContent) => {
    const token = (0, jsonwebtoken_1.sign)(jwtContent, process.env.JWT_SECRET);
    return token;
};
exports.generateAuthToken = generateAuthToken;
let TokenLibrary = class TokenLibrary {
    constructor() {
        this.saveUserToken = (options) => __awaiter(this, void 0, void 0, function* () {
            const tokenRepository = data_source_1.AppDataSource.getRepository(accounts_token_model_1.AccountsToken);
            const token = yield tokenRepository.findOne({
                where: {
                    account: {
                        id: options.account.id,
                    },
                    status: status_enum_1.Status.Active
                },
            });
            if (token) {
                yield tokenRepository.update({
                    id: token.id,
                }, {
                    authToken: options.authToken,
                    lastUsed: new Date(),
                });
            }
            else {
                yield tokenRepository.save({
                    authToken: options.authToken,
                    pushToken: '',
                    lastUsed: new Date(),
                    account: options.account,
                    version: options.version,
                });
            }
        });
    }
};
exports.TokenLibrary = TokenLibrary;
exports.TokenLibrary = TokenLibrary = __decorate([
    (0, typedi_1.Service)()
], TokenLibrary);
