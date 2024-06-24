import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import profile from "../../images/defaultProfile.png";
// import '../../components/adminComp/sidebar/sidebar.scss'
import "../left/leftSide.css";
import ColorItem from "../themeCustomization/ColorItem";
import "../themeCustomization/theme.css";
import ShareModal from "../ShareModal/ShareModal";
import { DarkModeContext } from "../../context/darkModeContext";
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
    "hsl(8, 86%, 61%)",
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

  return (
    <>
      <div className="left">
        <Link className="profileBox">
          <div className="profile-picture">
            <img
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
          <NavLink className="menu-item" to={`/profile/${user._id}`}>
            <span className="iconImg">
              <i className="uil uil-user-circle"></i>
            </span>
            <h3>Profile</h3>
          </NavLink>
          <Link className="menu-item" onClick={openThemeModal}>
            <span className="iconImg">
              <i className="uil uil-palette"></i>
            </span>
            <h3>Theme</h3>
          </Link>
          <NavLink className="menu-item" to={"/allapprovedSupervisors"}>
            <span className="iconImg">
              <i className="uil uil-users-alt"></i>
            </span>
            <h3>Supervisors</h3>
          </NavLink>
          <NavLink className="menu-item" to={"/student/uploadproject"}>
            <span className="iconImg">
              <i className="uil uil-upload-alt"></i>
            </span>
            <h3>Upload Project</h3>
          </NavLink>
          <NavLink className="menu-item" to={`/${user._id}/student/myprojects`}>
            <span className="iconImg">
              <i className="uil uil-layers"></i>
            </span>
            <h3>My Projects</h3>
          </NavLink>
          <NavLink className="menu-item" to={`/tasks/${user._id}`}>
            <span className="iconImg">
              <i className="uil uil-table"></i>
            </span>
            <h3>Taskboard</h3>
          </NavLink>
          <NavLink className="menu-item" to={"/student/files"}>
            <spa className="iconImg" n>
              <i className="uil uil-files-landscapes"></i>
            </spa>
            <h3>My Files</h3>
          </NavLink>

          <Link
            className="menu-item"
            onClick={() => dispatch({ type: "TOGGLE" })}
          >
            <span className="iconImg">
              <i class="uil uil-moon"></i>
            </span>
            <h3>Toggle</h3>
          </Link>

          <NavLink className="menu-item" to="/chatpage">
            <span className="iconImg">
              <i className="uil uil-comment-dots"></i>
            </span>
            <h3>Chat</h3>
          </NavLink>
          <NavLink className="menu-item" to="/notes">
            <span className="iconImg">
              <i className="uil uil-notes"></i>
            </span>
            <h3>Notes</h3>
          </NavLink>
          <NavLink className="menu-item" to="/appointments">
            <span className="iconImg">
              <i className="uil uil-schedule"></i>
            </span>
            <h3>Meeting Requests</h3>
          </NavLink>
          <NavLink className="menu-item" to="/addsupervisor">
            <span className="iconImg">
              <i className="uil uil-user-check"></i>
            </span>
            <h3>Apply Supervisor</h3>
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
      {/* // <!-- ========== THEME CUSTOMIZATION ========== --> */}
      <div className="customize-theme" onClick={closeThemeModal}>
        <div className="card themeCard">
          <h2>Customize your view</h2>
          <p className="text-muted">Manage your color and background</p>
          {/* <!-- -------  PRIMARY COLORS ----- --> */}
          <div className="color">
            <h4>Color</h4>
            <div className="choose-color">
              {/* <span className="color-1 activeColor"></span> */}
              {colors.map((color, id) => (
                <ColorItem key={id} color={color} setColor={setColor} />
              ))}
            </div>
          </div>
          {/* <!-- -------  BACKGROUND COLORS ----- --> */}
          {/* <h4 style={{marginTop:'2%'}}>Background Color</h4>
         <div className="bottom">
            <div className="colorOption" onClick={()=>{
            dispatch({type:"LIGHT"})
            closeThemeModal();
            }}></div>
            <div className="colorOption" onClick={()=>{
            dispatch({type:"DARK"})
            closeThemeModal();
            }}></div> */}
          {/* <div className="colorOption"></div> */}
          {/* </div> */}

          {/* <div className="background">
            <h4 style={{ marginTop: "2%" }}>Background</h4>
            <div className="choose-bg">
              {bgColors.map((bgcolor, fontClr, id) => (
                <BackgroundColor
                  key={id}
                  bgcolor={bgcolor}
                  bgsetColor={bgsetColor}
                  fontClr={fontClr}
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LeftSide;
