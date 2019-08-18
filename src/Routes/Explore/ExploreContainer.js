import React from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
import ExplorePresenter from "./ExplorePresenter";

const SEE_ALLPOSTS = gql`
  query seeAllPosts {
    seeAllPosts {
        id
        location
        caption
        user{
            id
        }
        files{
            id
            url
        }
        likeCount
        commentCount
    }
  }
`;

export default withRouter(() => {
  const { data, loading } = useQuery(SEE_ALLPOSTS);

  console.log(`ExplorePresenter.js | data : ${JSON.stringify(data, null, 2)}`);

  return <ExplorePresenter loading={loading} data={data} />;
});
