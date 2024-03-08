"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolvers = exports.ProductTypeDyfs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const services_1 = require("../services");
exports.ProductTypeDyfs = (0, apollo_server_express_1.gql) `
  type Products {
    id: Int!
    name: String!
    prices: Float!
    image: String
    sku: String
    quantity: Float
    description: String
    tax: Boolean
    status: String
    createdAt: String
    modifiedAt: String
    account: Accounts
  }


  type ResultProducts {
    result: [Products],
    amount: Int 
  }

  extend type Query {
    inventories(inputValue: String, limit: Int!, offset: Int!): ResultProducts
  }

  extend type Mutation {
    createProduct(
      name: String!,
      description: String!,
      prices: Float!
      image: String
      sku: String
      quantity: Float
      tax: Boolean
    ): operationResult
  }
`;
exports.ProductResolvers = {
    Query: {
        inventories: (_, args, { account }) => services_1.productService.inventories(args, account)
    },
    Mutation: {
        createProduct: (_, args, { account }) => services_1.productService.createProduct(args, account)
    }
};
