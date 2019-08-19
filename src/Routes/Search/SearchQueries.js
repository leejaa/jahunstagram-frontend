import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!) {
    search(term: $term) {
      id
      pictures {
        url
      }
      likeCount
    }
  }
`;

export const SEE_ALLUSER = gql`
  query seeAllUser{
    seeAllUser{
      id
      username
      isFollowing
      avatar
      isSelf
    }
  }
`;