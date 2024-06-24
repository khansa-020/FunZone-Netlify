import React from "react";
import { useSelector } from "react-redux";
import profile from "../../images/defaultProfile.png";
import cover from "../../images/defaultCover.jpg";
import "./profileCard.css";
import { Link } from "react-router-dom";
const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);

  // const ProfilePage=false;
  return (
    <>
      <div className="profileCard">
        <div className="profileImages">
          <img
            src={user.coverPicture ? `${user.coverPicture}` : cover}
            alt="coverImg"
          />

          <img
            src={user.profilePicture ? `${user.profilePicture}` : profile}
            alt="profileImg"
          />
        </div>
        <div className="profileName">
          <span>{user.username}</span>
          <span>
            {user.workStatus ? user.workStatus : "Write about yourself!"}
          </span>
        </div>
        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{user.following.length}</span>
              <span>Following</span>
            </div>
            {/* vertical line vl */}
            <div className="vl"></div>
            <div className="follow">
              <span>{user.followers.length}</span>
              <span>Followers</span>
            </div>
            {location === "profilePage" && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>
                    {posts?.filter((post) => post.userId === user._id).length}
                  </span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>
        {location === "profilePage" ? (
          ""
        ) : (
          <span>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/profile/${user._id}`}
            >
              My Profile
            </Link>
          </span>
        )}
      </div>
    </>
  );
};

export default ProfileCard;
