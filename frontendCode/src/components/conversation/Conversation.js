import React, { useEffect, useState } from "react";
import { getUser } from "../../api/UserRequest";
import profile from "../../images/defaultProfile.png";
import "../conversation/conversation.css";
const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div className="menu-item">
          <div className="profile-picture">
            <img
              className="profile-picture"
              src={
                userData.profilePicture ? `${userData.profilePicture}` : profile
              }
              alt="profileImg"
            />
            {online && <div className="online-dot"></div>}
          </div>
          <div className="name">
            <h3>{userData?.username}</h3>
            <h3>{online ? "Online" : "Offline"}</h3>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Conversation;
