import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/UserAction";
import profile from "../../images/defaultProfile.png";
const User = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <>
      <div className="follower message">
        <div>
          <img
            className="followerImg"
            src={person.profilePicture ? `${person.profilePicture}` : profile}
            alt="profileImg"
          />

          <div className="name">
            <span>{person.username}</span>
            <span>{person.email}</span>
          </div>
        </div>
        <button
          className={following ? "butn fc-butn Unfollowbutn" : "butn fc-butn"}
          onClick={handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      </div>
    </>
  );
};

export default User;
