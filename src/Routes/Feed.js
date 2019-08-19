import React from "react";
import { Helmet } from "rl-react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

export const FEED_QUERY = gql`
  query seeFeeds($feedId: String){
    seeFeeds(feedId: $feedId) {
      id
      title
      content
      user {
        id
        avatar
        username
      }
      pictures {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default ({history}) => {

  console.log(history);

  const { data, loading, refetch } = useQuery(FEED_QUERY, {
    variables: {
      feedId : history.location.state && history.location.state.feedId
    }
  });
  
  const refresh = async() => {
    await refetch();
  }

  if(history.location.state && history.location.state.feedId){
    refresh();
  }

  console.log(`data : ${JSON.stringify(data)}`);

  return (
    <Wrapper>
      <Helmet>
        <title>피드</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeeds &&
        data.seeFeeds.map(post => (
          <Post
            key={post.id}
            id={post.id}
            location={post.title}
            caption={post.content}
            user={post.user}
            files={post.pictures}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  );
};
