import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import 'antd/dist/antd.css';
import './Edit.css';
import { Input, Layout, Button } from 'antd';
import FatText from "../../Components/FatText";
const { Content } = Layout;


const Wrapper = styled.div`
  min-height: 100vh;
`;

export default ({ loading, name, email, firstName, lastName, bio, onSubmit }) => {

  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else{

    return (
        <Content className="profileContent">
            <div className="profileDiv1">
              <div className="profileDiv2">
                  <FatText text="이름"/>
                  <Input defaultValue={name.value} className="profileInput" {...name}/>
              </div>
              <div className="profileDiv2">
                  <FatText text="이메일"/>
                  <Input defaultValue={email.value} className="profileInput" {...email}/>
              </div>
              <div className="profileDiv2">
                  <FatText text="성"/>
                  <Input defaultValue={firstName.value} className="profileInput" {...firstName}/>
              </div>
              <div className="profileDiv2">
                  <FatText text="이름"/>
                  <Input defaultValue={lastName.value} className="profileInput" {...lastName}/>
              </div>
              <div className="profileDiv2">
                  <FatText text="성별"/>
                  <Input defaultValue={bio.value} className="profileInput" {...bio}/>
              </div>
              <div className="profileDiv2">
                  <Button type="primary" className="buttonInput" onClick={onSubmit}>수정</Button>
              </div>
            </div>
        
        </Content>
        
    );
  }
};
