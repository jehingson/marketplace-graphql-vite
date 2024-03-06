import { gql } from "@apollo/client";

const LOGIN_REQUEST = gql`
  mutation Login($email: String, $password: String, $iv: String) {
  login(email: $email, password: $password, iv: $iv) {
    authToken
    email
    id
    message
    picture
    status
    username
    role
  }
}

`
export default LOGIN_REQUEST