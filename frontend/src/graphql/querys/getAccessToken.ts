import { gql } from "@apollo/client";

const GET_ACCESS_TOKEN = gql`
  query Query {
    getAccessToken
  }
`;

export default GET_ACCESS_TOKEN