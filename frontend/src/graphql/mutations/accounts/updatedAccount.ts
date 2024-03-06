import { gql } from "@apollo/client";

const UPDATED_ACCOUNT = gql`
  mutation UpdateAccount($role: String, $username: String, $iv: String, $password: String) {
  updateAccount(role: $role, username: $username, iv: $iv, password: $password) {
    success
    id
    authToken
    email
    message
    picture
    status
    username
    role
  }
}
`
export default UPDATED_ACCOUNT