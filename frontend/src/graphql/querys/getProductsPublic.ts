import { gql } from '@apollo/client';

const GET_PRODUCTS_PUBLIC = gql`
  query ProductsPublic($limit: Int!, $offset: Int!, $inputValue: String) {
    productsPublic(limit: $limit, offset: $offset, inputValue: $inputValue) {
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
