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
exports.ProductsService = void 0;
const typedi_1 = require("typedi");
const data_source_1 = require("../../boot/data-source");
const products_model_1 = require("../models/products.model");
const graphql_1 = require("graphql");
let ProductsService = class ProductsService {
    constructor() {
        this.inventories = ({ inputValue, limit, offset }, account) => __awaiter(this, void 0, void 0, function* () {
            console.log("inputValue", inputValue);
            console.log("limit", limit);
            console.log("offset", offset);
            let result = [];
            console.log("account", account);
            try {
                const resposity = data_source_1.AppDataSource.getRepository(products_model_1.Products);
                if ((account === null || account === void 0 ? void 0 : account.role) === "admin") {
                    result = yield resposity
                        .createQueryBuilder("products")
                        .leftJoinAndSelect("products.account", "account")
                        .where(`(products.name LIKE :name OR products.sku LIKE :sku)`, {
                        name: `%${inputValue}%`,
                        sku: `%${inputValue}%`,
                    })
                        .skip(offset * limit)
                        .take(limit)
                        .orderBy("products.createdAt", "ASC")
                        .getManyAndCount();
                }
                else {
                    result = yield resposity
                        .createQueryBuilder("products")
                        .leftJoinAndSelect("products.account", "account")
                        .where(`account.id = :accountId AND (products.name LIKE :name OR products.sku LIKE :sku)`, {
                        name: `%${inputValue}%`,
                        sku: `%${inputValue}%`,
                        accountId: account.id,
                    })
                        .skip(offset * limit)
                        .take(limit)
                        .orderBy("products.createdAt", "ASC")
                        .getManyAndCount();
                }
                return {
                    result: result[0],
                    amount: result[1],
                };
            }
            catch (error) {
                console.log("errors", error);
                throw new graphql_1.GraphQLError("Error de conexión, vuelva a intentarlo.");
            }
        });
        this.createProduct = ({ name, description, prices, image, sku, quantity, tax }, account) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productRepository = data_source_1.AppDataSource.getRepository(products_model_1.Products);
                const newProducts = new products_model_1.Products();
                newProducts.name = name;
                newProducts.description = description;
                newProducts.sku = sku;
                newProducts.quantity = quantity;
                newProducts.prices = prices;
                newProducts.image = image;
                newProducts.tax = tax;
                newProducts.account = account.id;
                yield productRepository.save(newProducts);
                return { success: true, message: "" };
            }
            catch (error) {
                console.log("error", error);
                throw new graphql_1.GraphQLError("Error de conexión, vuelva a intentarlo.");
            }
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, typedi_1.Service)()
], ProductsService);
