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
exports.AccountsToken = void 0;
const typeorm_1 = require("typeorm");
const accounts_model_1 = require("./accounts.model");
const status_enum_1 = require("../enum/status.enum");
let AccountsToken = class AccountsToken extends typeorm_1.BaseEntity {
};
exports.AccountsToken = AccountsToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AccountsToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AccountsToken.prototype, "pushToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AccountsToken.prototype, "authToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50,
    }),
    __metadata("design:type", String)
], AccountsToken.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accounts_model_1.Accounts, (account) => account.tokens, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", accounts_model_1.Accounts)
], AccountsToken.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AccountsToken.prototype, "lastUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: status_enum_1.Status,
        default: status_enum_1.Status.Active,
    }),
    __metadata("design:type", String)
], AccountsToken.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AccountsToken.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AccountsToken.prototype, "updatedAt", void 0);
exports.AccountsToken = AccountsToken = __decorate([
    (0, typeorm_1.Entity)()
], AccountsToken);
