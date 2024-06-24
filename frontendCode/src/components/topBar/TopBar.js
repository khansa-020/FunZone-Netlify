import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profile from "../../images/defaultProfile.png";
import ShareModal from "../ShareModal/ShareModal";
import "../topBar/topBar.css";
const TopBar = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      <nav className="topbarNav">
        <div className="Container">
          <h2 className="logo">FunZone</h2>
          {/* <Spinner /> */}
          {/* <div className="search-bar">
                <i className="uil uil-search"></i>
                <input type="search" placeholder="Search for creators, inpirations, and projects"/>
            </div> */}
          <div className="create">
            <Link
              className="butn butn-primary"
              for="create-post"
              onClick={() => setModalOpened(true)}
            >
              <ShareModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
              />
              Create
            </Link>

            <div className="profile-picture">
              <img
                src={user.profilePicture ? `${user.profilePicture}` : profile}
                alt="profileImg"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default TopBar;
