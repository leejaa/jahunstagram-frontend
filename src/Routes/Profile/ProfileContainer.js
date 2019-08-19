import React, { useState } from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import axios from "axios"
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import { CONFIRM_SECRET, LOCAL_LOG_IN } from "../Auth/AuthQueries";
import { toast } from "react-toastify";

const GET_USER = gql`
  query seeUser($id: String!) {
    seeUser(id: $id) {
      id
      email
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
  const [loading3, setLoading3] = useState(false);
  const logOut = useMutation(LOG_OUT);
  const editUserMutation = useMutation(EDIT_USER, {
    refetchQueries: () => [{ query: GET_USER, variables: { id }}]
  });

  const confirmSecretMutation = useMutation(CONFIRM_SECRET);
  const localLogInMutation = useMutation(LOCAL_LOG_IN);

  const autoLogin = async(email) => {

    setLoading3(true);

    try {
      const {
        data: { confirmSecret: token }
      } = await confirmSecretMutation({
        variables: {
          email: email,
          authPassword: ""
        }
      });
      if (token !== "" && token !== undefined) {
        const token2 = localLogInMutation({ variables: { token } });

        if(token2){
          window.location = "/"
        }

      } else {
        throw Error();
      }
    } catch(error) {
      console.log(`error : ${error}`)
      toast.error("오류가 발생했습니다.");
    }finally{
      setLoading3(false);
    }
  }


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

  return <ProfilePresenter loading={loading} logOut={logOut} data={data} onChange={onChange} loading2={loading2} history={history} autoLogin={autoLogin} loading3={loading3}/>;
});
