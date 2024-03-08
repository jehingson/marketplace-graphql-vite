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
exports.Sales = void 0;
const typeorm_1 = require("typeorm");
const status_enum_1 = require("../enum/status.enum");
const products_model_1 = require("./products.model");
const orders_modal_1 = require("./orders.modal");
let Sales = class Sales extends typeorm_1.BaseEntity {
};
exports.Sales = Sales;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sales.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Sales.prototype, "prices", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sales.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_model_1.Products, (product) => product.sales),
    __metadata("design:type", products_model_1.Products)
], Sales.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => orders_modal_1.Orders, (order) => order.sales),
    __metadata("design:type", orders_modal_1.Orders)
], Sales.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: status_enum_1.Status,
        default: status_enum_1.Status.Active,
    }),
    __metadata("design:type", String)
], Sales.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Sales.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Sales.prototype, "updatedAt", void 0);
exports.Sales = Sales = __decorate([
    (0, typeorm_1.Entity)()
], Sales);
