import React from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import SquarePost from "../../Components/SquarePost";

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

export default ({ loading, data }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeAllPosts) {
    const {
        seeAllPosts
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>Prismagram</title>
        </Helmet>
        <Header>

        </Header>
        <Posts>
          {seeAllPosts &&
            seeAllPosts.map(seeAllPost => (
                <SquarePost
                  key={seeAllPost.id}
                  likeCount={seeAllPost.likeCount}
                  commentCount={seeAllPost.commentCount}
                  file={seeAllPost.files[0]}
                />
            ))}
        </Posts>
      </Wrapper>
    );
  }
  return null;
};
