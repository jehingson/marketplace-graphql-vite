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
exports.OrderService = void 0;
const graphql_1 = require("graphql");
const typedi_1 = require("typedi");
const products_model_1 = require("../models/products.model");
const data_source_1 = require("../../boot/data-source");
const typeorm_1 = require("typeorm");
const orders_modal_1 = require("../models/orders.modal");
const sales_modal_1 = require("../models/sales.modal");
let OrderService = class OrderService {
    constructor() {
        this.calculateTax = (prices, tax, quantity) => {
            const priceTax = prices * quantity;
            if (!tax)
                return priceTax;
            return priceTax + priceTax * 0.12;
        };
        this.calculateTotalOrder = (products, value) => {
            let totalPrice = 0;
            products.map((product) => {
                var _a;
                const order = value.find((itm) => itm.productId === product.id);
                totalPrice += this.calculateTax(product.prices, product.tax, (_a = order === null || order === void 0 ? void 0 : order.quantity) !== null && _a !== void 0 ? _a : 1);
                return product;
            });
            return totalPrice;
        };
        this.createOrder = ({ order }, account) => __awaiter(this, void 0, void 0, function* () {
            try {
                const value = JSON.parse(order);
                const productRepository = data_source_1.AppDataSource.getRepository(products_model_1.Products);
                const orderRepository = data_source_1.AppDataSource.getRepository(orders_modal_1.Orders);
                const saleRepository = data_source_1.AppDataSource.getRepository(sales_modal_1.Sales);
                const products = yield productRepository.find({
                    where: {
                        id: (0, typeorm_1.In)(value.map((ord) => ord.productId)),
                    },
                });
                if (!products && products.length === 0) {
                    throw new graphql_1.GraphQLError("Algo salió mal, valué a intentarlo.");
                }
                const total = this.calculateTotalOrder(products, value);
                const newOders = new orders_modal_1.Orders();
                newOders.total = total;
                newOders.account = account;
                const insertedOrder = yield orderRepository.save(newOders);
                const newSales = [];
                products.map((product) => {
                    const order = value.find((itm) => itm.productId === product.id);
                    const sale = new sales_modal_1.Sales();
                    sale.quantity = order.quantity;
                    sale.prices = this.calculateTax(product.prices, product.tax, order.quantity);
                    sale.order = insertedOrder;
                    sale.product = product;
                    newSales.push(sale);
                    return product;
                });
                yield saleRepository.save(newSales);
                return { success: true, message: "" };
            }
            catch (error) {
                throw new graphql_1.GraphQLError("Error de conexión, vuelva a intentarlo.");
            }
        });
        this.orders = ({ inputValue, limit, offset }, account) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resposity = data_source_1.AppDataSource.getRepository(orders_modal_1.Orders);
                const idAdmin = account.role === "admin";
                let result = [];
                if (idAdmin) {
                    result = yield resposity
                        .createQueryBuilder("orders")
                        .leftJoinAndSelect("orders.account", "account")
                        .leftJoinAndSelect("orders.sales", "sales")
                        .leftJoinAndSelect("sales.product", "product")
                        .where("account.id is not null")
                        .skip(offset * limit)
                        .take(limit)
                        .orderBy("orders.createdAt", "ASC")
                        .getManyAndCount();
                }
                else {
                    result = yield resposity
                        .createQueryBuilder("orders")
                        .leftJoinAndSelect("orders.account", "account", "account.id = :accountId", { accountId: account.id })
                        .leftJoinAndSelect("orders.sales", "sales")
                        .leftJoinAndSelect("sales.product", "product")
                        .where("account.id is not null")
                        .skip(offset * limit)
                        .take(limit)
                        .orderBy("orders.createdAt", "ASC")
                        .getManyAndCount();
                }
                return {
                    result: result[0],
                    amount: result[1],
                };
            }
            catch (error) {
                console.log("error", error);
                throw new graphql_1.GraphQLError("Error de conexión, vuelva a intentarlo.");
            }
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, typedi_1.Service)()
], OrderService);
