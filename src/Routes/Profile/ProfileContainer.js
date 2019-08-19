import React, { useState } from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import axios from "axios"
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";

const GET_USER = gql`
  query seeUser($id: String!) {
    seeUser(id: $id) {
      id
      avatar
      username
      isFollowing
      isSelf
      followingCount
      followersCount
      feedCount
      feed {
        id
        pictures {
          url
        }
        likeCount
      }
    }
  }
`;

const EDIT_USER = gql`
  mutation updateUser($url: String!) {
    updateUser(url: $url)
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(({ match: { params: { id } }, history }) => {
  const { data, loading } = useQuery(GET_USER, { variables: { id } });
  const [loading2, setLoading2] = useState(false);
  const logOut = useMutation(LOG_OUT);
  const editUserMutation = useMutation(EDIT_USER, {
    refetchQueries: () => [{ query: GET_USER, variables: { id }}]
  });

  const onChange = async event => {

    setLoading2(true);

    const {
        target: { files }
      } = event;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("api_key", "518252783565389");
    formData.append("upload_preset", "nuber-20190814");
    formData.append("timestamp", String(Date.now() / 1000));
    const {
    data: { secure_url }
    } = await axios.post(
        "https://api.cloudinary.com/v1_1/dbqgymmrx/image/upload",
        formData
    );

    await editUserMutation({
      variables: {
        url : secure_url
      }
    });

    setLoading2(false);
  }

  console.log(`ProfileContainer.js | data : ${JSON.stringify(data, null, 2)}`);

  return <ProfilePresenter loading={loading} logOut={logOut} data={data} onChange={onChange} loading2={loading2} history={history}/>;
});
