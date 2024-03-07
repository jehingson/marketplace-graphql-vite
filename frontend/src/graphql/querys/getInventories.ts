import { gql } from '@apollo/client';

const GET_INVENTORIES = gql`
  query Query($limit: Int!, $offset: Int!, $inputValue: String) {
    inventories(limit: $limit, offset: $offset, inputValue: $inputValue) {
      amount
      result {
        account {
          id
          username
        }
        id
        name
        prices
        image
        quantity
        sku
        tax
        description
        createdAt
      }
    }
  }
`;

export default GET_INVENTORIES;
