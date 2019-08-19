import React from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import SquarePost from "../../Components/SquarePost";
import FatText from "../../Components/FatText";
import UserCard from "../../Components/UserCard";

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

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;


export default ({ loading, data, history, data2, loading2 }) => {
  if (loading === true || loading2 === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeFeeds) {
    const {
        seeFeeds
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>jahunstagram</title>
        </Helmet>
        <Header>

        </Header>


        <Section>
          {data2.seeAllUser.length === 0 ? (
            <FatText text="유저를 찾을수 없습니다." />
          ) : (
            data2.seeAllUser.map(user => (
              <UserCard
                key={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
              />
            ))
          )}
        </Section>

        <Posts>
          {seeFeeds &&
            seeFeeds.map(seeFeed => (
                <SquarePost
                  key={seeFeed.id}
                  id={seeFeed.id}
                  likeCount={seeFeed.likeCount}
                  commentCount={""}
                  file={seeFeed.pictures[0]}
                  history={history}
                />
            ))}
        </Posts>
      </Wrapper>
    );
  }
  return null;
};
