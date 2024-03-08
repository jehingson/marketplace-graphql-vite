"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const accounts_graphql_1 = require("./accounts.graphql");
const app_graphql_1 = require("./app.graphql");
const products_graphql_1 = require("./products.graphql");
const public_graphql_1 = require("./public.graphql");
const oders_graphql_1 = require("./oders.graphql");
const RootTypeDefs = (0, apollo_server_express_1.gql) `
  scalar JSON

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type operationResult {
    success: Boolean
    message: String
  }
`;
exports.typeDefs = [
    RootTypeDefs,
    app_graphql_1.AppTypeDefs,
    accounts_graphql_1.AccountsTypeDefs,
    products_graphql_1.ProductTypeDyfs,
    public_graphql_1.PublicTypeDyfs,
    oders_graphql_1.OrdersTypeDyfs,
];
exports.resolvers = [
    accounts_graphql_1.AccountsResolvers,
    app_graphql_1.AppResolvers,
    products_graphql_1.ProductResolvers,
    public_graphql_1.PublicResolvers,
    oders_graphql_1.OrdersResolvers,
];
