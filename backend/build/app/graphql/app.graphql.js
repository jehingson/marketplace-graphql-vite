"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResolvers = exports.AppTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const services_1 = require("../services");
exports.AppTypeDefs = (0, apollo_server_express_1.gql) `
  extend type Query {
    getAccessToken: String
  }
`;
exports.AppResolvers = {
    Query: {
        getAccessToken: services_1.appService.getAccessToken
    }
};
