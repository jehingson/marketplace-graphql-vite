import { gql } from '@apollo/client';

const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String!
    $prices: Float!
    $sku: String
    $quantity: Float
    $tax: Boolean
    $image: String
  ) {
    createProduct(
      name: $name
      description: $description
      prices: $prices
      sku: $sku
      quantity: $quantity
      tax: $tax
      image: $image
    ) {
      message
      success
    }
  }
`;

export default CREATE_PRODUCT