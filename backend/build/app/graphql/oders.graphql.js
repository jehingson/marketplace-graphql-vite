"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersResolvers = exports.OrdersTypeDyfs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const services_1 = require("../services");
exports.OrdersTypeDyfs = (0, apollo_server_express_1.gql) `

  type Sales {
    id: Int
    prices: Float
    quantity: Int
    createdAt: String
    product: Products
  }

  type Order {
    id: Int
    account: Accounts
    total: Float
    createdAt: String
    sales: [Sales]
  }

  type ResultOrdes {
    result: [Order],
    amount: Int 
  }

  extend type Query {
    orders(inputValue: String, limit: Int!, offset: Int!): ResultOrdes
  }

  extend type Mutation {
    createOrder(
      order: String!
    ): operationResult
  }
`;
exports.OrdersResolvers = {
    Query: {
        orders: (_, args, { account }) => services_1.orderService.orders(args, account)
    },
    Mutation: {
        createOrder: (_, args, { account }) => services_1.orderService.createOrder(args, account)
    }
};
