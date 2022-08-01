import { gql } from "@apollo/client";
const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String
    $email: String!
    $tos: Boolean!
    $password: String!
    $phoneNumber: String
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        tos: $tos
        phoneNumber: $phoneNumber
      }
    ) {
      id
      email
      createdAt
      token
      firstName
      lastName
      phoneNumber
    }
  }
`;
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      createdAt
      token
      firstName
      lastName
      phoneNumber
    }
  }
`;

export { REGISTER_USER, LOGIN_USER };
