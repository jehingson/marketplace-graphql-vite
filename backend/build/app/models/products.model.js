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
exports.Products = void 0;
const typeorm_1 = require("typeorm");
const status_enum_1 = require("../enum/status.enum");
const accounts_model_1 = require("./accounts.model");
const sales_modal_1 = require("./sales.modal");
let Products = class Products extends typeorm_1.BaseEntity {
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Products.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Products.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Products.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Products.prototype, "prices", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Products.prototype, "tax", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accounts_model_1.Accounts, (account) => account.products),
    __metadata("design:type", accounts_model_1.Accounts)
], Products.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: status_enum_1.Status,
        default: status_enum_1.Status.Active,
    }),
    __metadata("design:type", String)
], Products.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Products.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Products.prototype, "modifiedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sales_modal_1.Sales, sale => sale.product),
    __metadata("design:type", Array)
], Products.prototype, "sales", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)()
], Products);
