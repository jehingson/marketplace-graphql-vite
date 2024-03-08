import { gql } from '@apollo/client';

const CREATE_ORDER = gql`
  mutation Mutation($order: String!) {
    createOrder(order: $order) {
      message
      success
    }
  }
`;
export default CREATE_ORDER;
