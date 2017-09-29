import gql from 'graphql-tag'

export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $firstName: String!
    $lastName: String!
    $role: Role!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      role: $role
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        role
        firstName
        lastName
        id
      }
    }
  }
`

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        role
        firstName
        lastName
        id
      }
    }
  }
`
