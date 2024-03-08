import { gql } from "apollo-server-express";
import { publicService } from "../services";

export const PublicTypeDyfs = gql`
  type ResultProducts {
    result: [Products],
    amount: Int 
  }

  extend type Query {
    productsPublic(inputValue: String, limit: Int!, offset: Int!, range: [Int]): ResultProducts
  }
`;

export const PublicResolvers = {
  Query: {
    productsPublic: (_, args) => publicService.products(args)
  },
};
