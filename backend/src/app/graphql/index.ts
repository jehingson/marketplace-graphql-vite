import { gql } from "apollo-server-express";
import { AccountsResolvers, AccountsTypeDefs } from "./accounts.graphql";
import { AppResolvers, AppTypeDefs } from "./app.graphql";
import { ProductResolvers, ProductTypeDyfs } from "./products.graphql";

const RootTypeDefs = gql`
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

export const typeDefs = [
  RootTypeDefs,
  AppTypeDefs,
  AccountsTypeDefs,
  ProductTypeDyfs,
];

export const resolvers = [
  AccountsResolvers, 
  AppResolvers, 
  ProductResolvers
];
