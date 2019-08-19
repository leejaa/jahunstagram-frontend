import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import SquarePost from "../../Components/SquarePost";
import UserCard from "../../Components/UserCard";

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const SearchPresenter = ({ searchTerm, loading, data, data2, history }) => {
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text="검색어를 입력해주세요" />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.search) {
    return (
      <Wrapper>

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


        <PostSection>
          {data.search.length === 0 ? (
            <FatText text="피드를 찾을수 업습니다." />
          ) : (
            data.search.map(feed => (
              <SquarePost
                key={feed.id}
                id={feed.id}
                likeCount={feed.likeCount}
                commentCount={""}
                file={feed.pictures[0]}
                history={history}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
};

export default SearchPresenter;
