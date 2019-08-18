import { gql } from "apollo-boost";

export const EDIT_USER = gql`
  mutation editUser(
    $name: String!
    $email: String!
    $firstName: String
    $lastName: String
    $bio: String
    $avatar: String
  ) {
    editUser(
      name: $name
      email: $email
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      avatar: $avatar
    ){
        id
        name
        email
        firstName
        lastName
        bio
        avatar
    }
  }
`;