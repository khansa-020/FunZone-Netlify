import React, { useContext } from "react";
import "../navbar/navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import profile from "../../../images/defaultProfile.png";
import { DarkModeContext } from "../../../context/darkModeContext";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="adminNavbar">
      <div className="wrapper">
        <div style={{ color: "hsl(0 0% 75% / 1)" }}>Admin Panel</div>
        <div className="items">
          <div className="item" onClick={() => dispatch({ type: "TOGGLE" })}>
            <DarkModeOutlinedIcon className="icon" />
            Toggle Mode
          </div>

          <div
            className="item"
            onClick={() => {
              navigate("/notification");
            }}
          >
            {/* <NotificationsNoneOutlinedIcon className="icon" /> */}
            <Badge
              size="small"
              count={user && user.notification?.length}
              onClick={() => {
                navigate("/notification");
              }}
            >
              <i
                style={{
                  color: "var(--color-gray)",
                }}
                className="fa-solid fa-bell"
              ></i>
            </Badge>
            Notifications
          </div>

          <div className="profile-picture">
            <img
              src={user.profilePicture ? `${user.profilePicture}` : profile}
              alt="profileImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
