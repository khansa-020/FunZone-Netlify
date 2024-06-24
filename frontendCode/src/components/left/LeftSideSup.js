import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import profile from "../../images/defaultProfile.png";
// import '../../components/adminComp/sidebar/sidebar.scss'
import "../left/leftSide.css";
import ColorItem from "../themeCustomization/ColorItem";
import BackgroundColor from "../themeCustomization/BackgroundColor";
import "../themeCustomization/theme.css";
import ShareModal from "../ShareModal/ShareModal";
import { DarkModeContext } from "../../context/darkModeContext";
import { logout } from "../../actions/AuthAction";
import { Badge } from "antd";
const LeftSide = () => {
  const { dispatch } = useContext(DarkModeContext);

  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  // const posts=useSelector((state)=>state.postReducer.posts)
  const colors = [
    "hsl(252, 75%, 60%)",
    "hsl(52, 75%, 60%)",
    "hsl(352, 75%, 60%)",
    "hsl(152, 75%, 60%)",
    "hsl(7, 86%, 61%)",
  ];
  const bgColors = ["#fff", "hsl(252,30%,10%)", "hsl(252,30%,17%)"];
  let themeModal = "";
  useEffect(() => {
    const currentColor = localStorage.getItem("color");
    const bgColor = localStorage.getItem("bgcolor");
    const fontClr = localStorage.getItem("fontClr");

    setTheme(currentColor);
    setBackground(bgColor, fontClr);
    themeModal = document.querySelector(".customize-theme");

    // have access to it
  }, []);
  // var root=document.querySelector(`:root`);
  // const colorPalette = document.querySelectorAll(`.choose-color span`);
  // open modal
  const openThemeModal = () => {
    themeModal.style.display = `grid`;
  };
  // closes modal
  const closeThemeModal = (e) => {
    if (e.target.classList.contains("customize-theme")) {
      themeModal.style.display = "none";
    }
  };
  const setTheme = (color) => {
    document.documentElement.style.setProperty("--color-primary", color);
  };
  const setBackground = (bgColor, fontClr) => {
    document.documentElement.style.setProperty("--color-white", bgColor);
    document.documentElement.style.setProperty("--color-dark", fontClr);
  };

  const setColor = (e) => {
    const currentColor = e.target.style.getPropertyValue("--color-primary");
    setTheme(currentColor);
    localStorage.setItem("color", currentColor);
  };
  const bgsetColor = (e) => {
    const bgColor = e.target.style.getPropertyValue("--color-white");
    const fontClr = e.target.style.getPropertyValue("--color-dark");
    setBackground(bgColor, fontClr);
    localStorage.setItem("bgcolor", bgColor);
    localStorage.setItem("fontClr", fontClr);
  };
  const dispatchLogout = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatchLogout(logout());
    navigate("/auth");
  };
  return (
    <>
      <div className="left">
        <Link className="profileBox">
          <div className="profile-picture">
            <img
              style={{ height: "2.5rem" }}
              src={user.profilePicture ? `${user.profilePicture}` : profile}
              alt="profileImg"
            />
          </div>
          <div className="handle">
            <h4>{user?.username}</h4>
            <p className="text-muted">{user?.email}</p>
          </div>
        </Link>
        {/* <!-- ----SIDEBAR---- --> */}
        <div className="sidebar">
          <NavLink className="menu-item" to="/">
            <span className="iconImg">
              <i className="uil uil-home"></i>
            </span>
            <h3>Home</h3>
          </NavLink>
          <NavLink className="menu-item" to={`/supervisor/profile/${user._id}`}>
            <span className="iconImg">
              <i className="uil uil-user-circle"></i>
            </span>
            <h3>Profile</h3>
          </NavLink>
          <NavLink className="menu-item" to="/supervisordashboard">
            <span className="iconImg">
              <i className="uil uil-image-share"></i>
            </span>
            <h3>Share Post</h3>
          </NavLink>
          {/* <NavLink className="menu-item" to={`/tasks/${user._id}`}>
            <span className="iconImg">
              <i className="uil uil-table"></i>
            </span>
            <h3>Taskboard</h3>
          </NavLink> */}
          {/* <NavLink className="menu-item" to={`/uploads/${user._id}`}>
            <spa className="iconImg" n>
              <i className="uil uil-upload"></i>
            </spa>
            <h3>Upload</h3>
          </NavLink> */}

          <Link
            className="menu-item"
            onClick={() => dispatch({ type: "TOGGLE" })}
          >
            <span className="iconImg">
              <i class="uil uil-moon"></i>
            </span>
            <h3>Toggle</h3>
          </Link>

          <NavLink className="menu-item" to="/notification">
            <span className="iconImg">
              <Badge
                size="small"
                count={user && user.notification?.length}
                onClick={() => {
                  navigate("/notification");
                }}
              >
                <i className="uil uil-bell"></i>
              </Badge>
            </span>
            <h3>Notifications</h3>
          </NavLink>
          <NavLink className="menu-item" to="/chatpage">
            <span className="iconImg">
              <i className="uil uil-comment-dots"></i>
            </span>
            <h3>Chat</h3>
          </NavLink>
          <NavLink className="menu-item" to="/notes">
            <span className="iconImg">
              <i className="uil uil-table"></i>
            </span>
            <h3>Notes</h3>
          </NavLink>
          {/* <NavLink className="menu-item" to="/meeting">
            <span className="iconImg">
              <i className="uil uil-schedule"></i>
            </span>
            <h3>Schedule Meeting</h3>
          </NavLink> */}
          <NavLink className="menu-item" to="/supervisorappointments">
            <span className="iconImg">
              <i className="uil uil-schedule"></i>
            </span>
            <h3>Meeting Appointments</h3>
          </NavLink>
          <NavLink className="menu-item" to="/auth" onClick={handleLogout}>
            <span className="iconImg">
              <i className="uil uil-sign-out-alt"></i>
            </span>
            <h3>Logout</h3>
          </NavLink>
          {/* <!-- <Link className="menu-item">
        <span><i className="uil uil-signal-alt-3"></i></span><h3>Reports</h3>
    </Link> --> */}
        </div>
        {/* <!-- ----END OF SIDEBAR---- --> */}
        {/* <Link className="butn butn-primary" htmlFor="create-post">Create Post</Link> */}
        <Link
          className="butn butn-primary"
          htmlFor="create-post"
          onClick={() => setModalOpened(true)}
        >
          <ShareModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
          Create
        </Link>
      </div>
      {/* // end of sidebar */}
    </>
  );
};

export default LeftSide;
