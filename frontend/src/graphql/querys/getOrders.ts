import { gql } from '@apollo/client';

const GET_ORDERS = gql`
  query Query($limit: Int!, $offset: Int!, $inputValue: String) {
    orders(limit: $limit, offset: $offset, inputValue: $inputValue) {
      amount
      result {
        account {
          id
          username
        }
        sales {
          id
          prices
          quantity
          product {
            id
            name
          }
        }
        id
        total
        createdAt
      }
    }
  }
`;
export default GET_ORDERS
