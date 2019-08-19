import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH, SEE_ALLUSER } from "./SearchQueries";
import Loader from "../../Components/Loader";

export default withRouter(({ location: { search }, history }) => {

  console.log(`search : ` + search);

  const term = decodeURI(search).split("=")[1];

  console.log(`term : ${term}`);

  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term
    }
  });

  const { data : data2, loading : loading2 } = useQuery(SEE_ALLUSER);

  console.log(`data2 : ${JSON.stringify(data2)}`);

  return loading || loading2 ? <Loader/> : <SearchPresenter searchTerm={term} loading={loading} data={data} data2={data2} history={history}/>;
});
