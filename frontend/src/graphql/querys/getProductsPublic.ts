import { gql } from '@apollo/client';

const GET_PRODUCTS_PUBLIC = gql`
  query Products($inputValue: String, $offset: Int!, $limit: Int!) {
    products(inputValue: $inputValue, offset: $offset, limit: $limit) {
      amount
      result {
        account {
          id
          username
        }
        id
        description
        createdAt
        image
        name
        prices
        quantity
        sku
        tax
        status
      }
    }
  }
`;

export default GET_PRODUCTS_PUBLIC;
