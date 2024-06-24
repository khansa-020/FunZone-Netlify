import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeftSide from "../../components/left/LeftSide";
import profile from "../../images/defaultProfile.png";

const ScheduleMeeting = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      <nav>
        <div className="Container">
          <h2 className="logo">FunZone</h2>
          {/* <Spinner /> */}
          {/* <div className="search-bar">
                <i className="uil uil-search"></i>
                <input type="search" placeholder="Search for creators, inpirations, and projects"/>
            </div> */}
          <div className="create">
            <span
              style={{
                marginTop: "7%",
              }}
            >
              {" "}
              <i
                style={{
                  color: "var(--color-secondary)",
                }}
                className="fa-solid fa-bell"
              ></i>
            </span>

            <div className="profile-picture">
              <Link to="/profile/:id">
                <img
                  src={user.profilePicture ? `${user.profilePicture}` : profile}
                  alt="profileImg"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="Container">
          <LeftSide />
          {/* <MiddleSide /> */}
          {/* <RightSide /> */}
        </div>
      </main>
    </>
  );
};

export default ScheduleMeeting;
