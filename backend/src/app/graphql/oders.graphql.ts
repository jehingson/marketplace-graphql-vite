import { gql } from "apollo-server-express";
import { orderService } from "../services";


export const OrdersTypeDyfs = gql`

  # type ResultProducts {
  #   result: [Products],
  #   amount: Int 
  # }

  # extend type Query {
  #   orders(inputValue: String, limit: Int!, offset: Int!): ResultProducts
  # }

  extend type Mutation {
    createOrder(
      productsId: [Int]!
    ): operationResult
  }
`;

export const OrdersResolvers = {
  Query: {
    // inventories: (_, args, { account }) => productService.inventories(args, account)
  },
  Mutation: {
    createOrder: (_, args, { account }) => orderService.createOrder(args, account)
  }
};
