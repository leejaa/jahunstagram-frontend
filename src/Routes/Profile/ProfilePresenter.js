import React from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";

const Container = styled.div``;

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const Image = styled.label`
  cursor: pointer;
  height: 200px;
  width: 200px;
  border: 2px solid black;
  display: block;
  border-radius: 50%;
  margin-bottom: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 200px;
    height: 200px;
  }
`;

const Input = styled.input`
  color: white;
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
`;


const Username = styled.span`
  font-size: 26px;
  display: block;
`;

const Username2 = styled.span`
  font-size: 26px;
  display: block;
  width: 65px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

export default ({ loading, data, logOut, loading2, onChange, history }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        isFollowing,
        isSelf,
        followingCount,
        followersCount,
        feedCount,
        feed,
      }
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | 인스타그램</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Container>
            {
              isSelf && (
                <Input id={"photo"} type="file" accept="image/*" onChange={onChange}/>
              )
            }
            <Image htmlFor="photo">
              {
                loading2 ? (
                  <img src={"http://images.battlecomics.co.kr/users/342512/page/item/381adfc0-c22d-4d62-9cd9-64781c063223.gif"} />
                ) : (
                  <img src={avatar} />
                )
              }
            </Image>
              {/* <Avatar size="lg" url={avatar} /> */}
            </Container>

          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>{" "}
              <Username2></Username2>
              {isSelf ? (
                <Button onClick={logOut} text="로그아웃" width={"50%"}/>
              ) : (
                <FollowButton isFollowing={isFollowing} id={id} width={"50%"}/>
              )}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(feedCount)} /> 피드
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> 팔로워
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> 팔로잉
              </Count>
            </Counts>
            <FullName text={username} />
            <Bio>&nbsp;</Bio>
            {!isSelf && (
                <Button text="자동로그인" />
            )}
          </HeaderColumn>
        </Header>
        <Posts>
          {feed &&
            feed.map(f => (
              <SquarePost
                key={f.id}
                id={f.id}
                likeCount={f.likeCount}
                commentCount={""}
                file={f.pictures[0]}
                history={history}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
  return null;
};
