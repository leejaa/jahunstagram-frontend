import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { FEED_QUERY } from "../../Routes/Feed";


const FollowButtonContainer = ({ isFollowing, id, width }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const followMutation = useMutation(FOLLOW, { variables: { id }
  , refetchQueries: () => [{ query: FEED_QUERY}]
  });

  const onClick = () => {
    if (isFollowingS === true) {
      setIsFollowing(false);
      followMutation();
    } else {
      setIsFollowing(true);
      followMutation();
    }
  };
  return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} width={width}/>;
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};

export default FollowButtonContainer;
