"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accounts_token_model_1 = require("./accounts-token.model");
const accounts_model_1 = require("./accounts.model");
const orders_modal_1 = require("./orders.modal");
const products_model_1 = require("./products.model");
const sales_modal_1 = require("./sales.modal");
exports.default = [accounts_model_1.Accounts, accounts_token_model_1.AccountsToken, products_model_1.Products, orders_modal_1.Orders, sales_modal_1.Sales];
