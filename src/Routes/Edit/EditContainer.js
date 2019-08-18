import React, { useEffect } from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
import { toast } from "react-toastify";
import { useMutation } from "react-apollo-hooks";
import EditPresenter from "./EditPresenter";
import useInput from "../../Hooks/useInput";
import { EDIT_USER } from "./EditQueries";

const GET_USER = gql`
  query seeUser($id: String!) {
    seeUser(id: $id) {
      id
      name
      bio
      firstName
      lastName
      email
    }
  }
`;


export default withRouter (({ match: { params: { id } }, history }) => {
  
  console.log(`EditContainer.js | id : ${id}`);
  
  const { data, loading } = useQuery(GET_USER, { variables: { id } });
  
  console.log(`loading : ${loading}`);
  console.log(`EditContainer.js | data : ${JSON.stringify(data, null, 2)}`);
  
    const name = useInput("");
    const email = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const bio = useInput("");

    useEffect(() => {
      
      if(!loading && data && data.seeUser){

        name.setValue(name.value === "" ? data.seeUser.name : name.value);
        email.setValue(email.value === "" ? data.seeUser.email : email.value);
        firstName.setValue(firstName.value === "" ? data.seeUser.firstName : firstName.value);
        lastName.setValue(lastName.value === "" ? data.seeUser.lastName : lastName.value);
        bio.setValue(bio.value === "" ? data.seeUser.bio : bio.value);

      }

    });

  const editUserMutation = useMutation(EDIT_USER, {
    variables: {
      name: name.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      bio: bio.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const {
        data
      } = await editUserMutation();

      console.log(`EditContainer.js | data2 : ${JSON.stringify(data, null, 2)}`);

      alert("수정이 완료되었습니다.");

      const {
        editUser : { id }
      } = data;

      history.push(`/${id}`);

    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  return (
    <EditPresenter
       loading={loading}
       name={name}
       email={email}
       firstName={firstName}
       lastName={lastName}
       bio={bio}
       data={data}
       onSubmit={onSubmit}
    />
  );


});
