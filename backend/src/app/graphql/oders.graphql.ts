import { gql } from "apollo-server-express";
import { orderService } from "../services";


export const OrdersTypeDyfs = gql`

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

export const OrdersResolvers = {
  Query: {
    orders: (_, args, { account }) => orderService.orders(args, account)
  },
  Mutation: {
    createOrder: (_, args, { account }) => orderService.createOrder(args, account)
  }
};
