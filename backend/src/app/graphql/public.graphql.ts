import { gql } from "apollo-server-express";
import { publicService } from "../services";

export const PublicTypeDyfs = gql`
  type ResultProducts {
    result: [Products],
    amount: Int 
  }

  extend type Query {
    products(inputValue: String, limit: Int!, offset: Int!): ResultProducts
  }
`;

export const PublicResolvers = {
  Query: {
    products: (_, args) => publicService.products(args)
  },
};
