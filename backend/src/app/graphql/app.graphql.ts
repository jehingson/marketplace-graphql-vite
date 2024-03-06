import { gql } from "apollo-server-express";
import { appService } from "../services";

export const AppTypeDefs = gql`
  extend type Query {
    getAccessToken: String
  }
`

export const AppResolvers = {
  Query: {
    getAccessToken: appService.getAccessToken
  }
}