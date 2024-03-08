"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicResolvers = exports.PublicTypeDyfs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const services_1 = require("../services");
exports.PublicTypeDyfs = (0, apollo_server_express_1.gql) `
  type ResultProducts {
    result: [Products],
    amount: Int 
  }

  extend type Query {
    productsPublic(inputValue: String, limit: Int!, offset: Int!, range: [Int]): ResultProducts
  }
`;
exports.PublicResolvers = {
    Query: {
        productsPublic: (_, args) => services_1.publicService.products(args)
    },
};
