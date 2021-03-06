import React, { useState } from "react";
import axios from "axios"
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";
import { toast } from "react-toastify";
import { fnLog } from "../../utils";
import { BACKEND_URL, CLIENT_ID } from "../../env";

export default () => {

  let state;

  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const secret = useInput("");
  const email = useInput("");
  const requestSecretMutation = useMutation(LOG_IN, {
    variables: { email: email.value }
  });
  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      name: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });
  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      authPassword: secret.value
    }
  });
  const localLogInMutation = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("회원가입이 되어있지 않습니다.");
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            toast.success("이메일로 전송된 인증번호를 입력해주세요.");
            setAction("confirm");
          }
        } catch(error) {
          fnLog(`error : ${error}`);
          toast.error("인증번호 요청에 실패했습니다.");
        }
      } else {
        toast.error("이메일주소가 필요합니다.");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("계정생성에 실패하였씁니다.");
          } else {
            toast.success("회원가입에 성공했습니다. 로그인해주세요.");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("모든 입력란을 작성해주세요.");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch(error) {
          fnLog(`error : ${error}`);
          toast.error("인증번호를 확인해주세요.");
        }
      }
    }
  };

  const autoLogin = async() => {
    try {
      const {
        data: { confirmSecret: token }
      } = await confirmSecretMutation({
        variables: {
          email: "jahun88@naver.com"
          , authPassword: ""
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
      fnLog(`error : ${error}`);
      toast.error("오류가 발생하였습니다.");
    }
  }

  const kakaoLogin = async() => {

     const tempState = ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1) + ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);

     state = tempState;

    window.open(`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${BACKEND_URL}/kakao&response_type=code&state=${tempState}&encode_state=true`);

    toast.info(`카카오로그인을 기다리는 중입니다..`, {
      autoClose: 10000000
    });

    console.log(`state : ${state}`);

    setInterval(async() => {

      console.log(`요청 state : ${state}`);

      const resultEmail = await axios.get(`${BACKEND_URL}/kakaoLogin`, {
        params: {
          state: state
        }
      });

      console.log(`resultEmail : ${JSON.stringify(resultEmail)}`);

      if(resultEmail){

        const {data } = resultEmail;

        console.log(`data : ${JSON.stringify(data)}`);

        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation({
            variables: {
              email: data[0].email
              , authPassword: state
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
          fnLog(`error : ${error}`);
          // toast.error("오류가 발생하였습니다.");
        }
      }

    }, 3000);

  }

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
      autoLogin={autoLogin}
      kakaoLogin={kakaoLogin}
    />
  );
};
