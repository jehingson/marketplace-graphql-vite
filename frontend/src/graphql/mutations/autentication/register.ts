import { gql } from "@apollo/client";

const REGISTER_REQUEST = gql`
 mutation Register($username: String, $email: String, $password: String, $iv: String) {
  register(username: $username, email: $email, password: $password, iv: $iv) {
    authToken
    email
    id
    picture
    status
    username
    role

  }
}
`
export default REGISTER_REQUEST