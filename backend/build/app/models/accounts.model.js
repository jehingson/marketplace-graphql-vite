"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accounts = void 0;
const typeorm_1 = require("typeorm");
const status_enum_1 = require("../enum/status.enum");
const roles_enum_1 = require("../enum/roles.enum");
const accounts_token_model_1 = require("./accounts-token.model");
const products_model_1 = require("./products.model");
const orders_modal_1 = require("./orders.modal");
let Accounts = class Accounts extends typeorm_1.BaseEntity {
};
exports.Accounts = Accounts;
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        length: 36,
    }),
    __metadata("design:type", String)
], Accounts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Accounts.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], Accounts.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Accounts.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: roles_enum_1.Roles,
        default: roles_enum_1.Roles.Client,
    }),
    __metadata("design:type", String)
], Accounts.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: status_enum_1.Status,
        default: status_enum_1.Status.Active,
    }),
    __metadata("design:type", String)
], Accounts.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Accounts.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Accounts.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => accounts_token_model_1.AccountsToken, accountToken => accountToken.account),
    __metadata("design:type", Array)
], Accounts.prototype, "tokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => products_model_1.Products, product => product.account),
    __metadata("design:type", Array)
], Accounts.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_modal_1.Orders, order => order.account),
    __metadata("design:type", Array)
], Accounts.prototype, "orders", void 0);
exports.Accounts = Accounts = __decorate([
    (0, typeorm_1.Entity)()
], Accounts);
