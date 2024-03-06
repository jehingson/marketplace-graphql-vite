import { gql } from "apollo-server-express";
import { productService } from "../services";

export const ProductTypeDyfs = gql`
  type Products {
    id: Int!
    name: String!
    prices: Float!
    image: String
    sku: String
    quantity: Float
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

export const ProductResolvers = {
  Query: {
    inventories: (_, args, { account }) => productService.inventories(args, account)
  },
  Mutation: {
    createProduct: (_, args, { account }) => productService.createProduct(args, account)
  }
};
