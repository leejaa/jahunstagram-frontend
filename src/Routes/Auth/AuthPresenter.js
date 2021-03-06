import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";


const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  action,
  username,
  firstName,
  lastName,
  email,
  setAction,
  onSubmit,
  secret,
  autoLogin,
  kakaoLogin
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <>
          <Helmet>
            <title>로그인</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} {...email} type="email" required={false}/>
            <Button text={"로그인"} />
            <Button text={"테스트계정으로 로그인"} onClick={autoLogin}/>
            <Button text={"카카오계정으로 로그인"} onClick={kakaoLogin} backgroundColor={"#f7e317"} textColor={"black"}/>
          </form>
        </>
      )}
      {action === "signUp" && (
        <>
          <Helmet>
            <title>회원가입</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"First name"} {...firstName} />
            <Input placeholder={"Last name"} {...lastName} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Username"} {...username} />
            <Button text={"회원가입"} />
          </form>
        </>
      )}
      {action === "confirm" && (
        <>
          <Helmet>
            <title>인증번호 확인</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder="인증번호를 입력해주세요" required {...secret} />
            <Button text={"인증번호 확인"} />
          </form>
        </>
      )}
    </Form>

    {action !== "confirm" && (
      <StateChanger>
        {action === "logIn" ? (
          <>
            계정이 없나요?{" "}
            <Link onClick={() => setAction("signUp")}>회원가입</Link>
          </>
        ) : (
          <>
            계정이 있나요??{" "}
            <Link onClick={() => setAction("logIn")}>로그인</Link>
          </>
        )}
      </StateChanger>
    )}
  </Wrapper>
);
