import React, { useEffect } from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
import ExplorePresenter from "./ExplorePresenter";
import { toast } from "react-toastify";
import { SEE_ALLUSER } from "../Search/SearchQueries";

const SEE_FEEDS = gql`
  query seeFeeds {
    seeFeeds {
        id
        title
        content
        user{
            id
        }
        pictures{
            id
            url
        }
        likeCount
    }
  }
`;

export default withRouter(({history}) => {
  const { data, loading } = useQuery(SEE_FEEDS);
  const { data : data2, loading : loading2 } = useQuery(SEE_ALLUSER);

  useEffect(() => {

    if(!loading && !loading2){
      toast.info(`검색창에 검색어를 입력해주세요`);
    }

    
  }, [loading, loading2])

  console.log(`ExplorePresenter.js | data : ${JSON.stringify(data, null, 2)}`);

  return <ExplorePresenter loading={loading} data={data} history={history} loading2={loading2} data2={data2}/>;
});
