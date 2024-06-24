import React, { useContext } from "react";
// import "../sidebar/sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
// import GroupIcon from "@mui/icons-material/Group";
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../context/darkModeContext";
// const Sidebar = () => {
// const { dispatch } = useContext(DarkModeContext);

//   return (
//     <div className="adminSidebar">
//       <div className="top">
//         <Link to="/admin" style={{ textDecoration: "none" }}>
//           <span className="logo">FunZone</span>
//         </Link>
//       </div>
//       <hr />
//       <div className="center">
//         <ul>
//           <p className="title">Main</p>
//           <li>
//             <HomeIcon className="icon" />
//             <span>Admin Dashboard</span>
//           </li>
//           <Link to="/admin/users" style={{ textDecoration: "none" }}>
//             <li>
//               <GroupIcon className="icon" />
//               <span>Students</span>
//             </li>
//           </Link>
//           <Link to="/admin/students" style={{ textDecoration: "none" }}>
//             <li>
//               <GroupIcon className="icon" />
//               <span>Students2</span>
//             </li>
//           </Link>
//           <Link to="/admin/supervisors" style={{ textDecoration: "none" }}>
//             <li>
//               <GroupIcon className="icon" />
//               <span>Supervisors</span>
//             </li>
//           </Link>
//           <Link to="/admin/users/projects" style={{ textDecoration: "none" }}>
//             <li>
//               <AccountTreeIcon className="icon" />
//               <span>Projects</span>
//             </li>
//           </Link>
//           <li>
//             <NotificationsIcon className="icon" />
//             <span>Notifications</span>
//           </li>
//           <li>
//             <AssessmentIcon className="icon" />
//             <span>Reports</span>
//           </li>
//           <p className="title">Account</p>
//           <li>
//             <ManageAccountsIcon className="icon" />
//             <span>Profile</span>
//           </li>
//           <li>
//             <LogoutIcon className="icon" />
//             <span>Logout</span>
//           </li>
//         </ul>
//       </div>
//       <div className="bottom">
//         <div
//           className="colorOption"
//           onClick={() => dispatch({ type: "LIGHT" })}
//         ></div>
//         <div
//           className="colorOption"
//           onClick={() => dispatch({ type: "DARK" })}
//         ></div>
//         {/* <div className="colorOption"></div> */}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/AuthAction";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const dispatchLogout = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatchLogout(logout());
    navigate("/auth");
  };
  return (
    <div
      style={{ display: "flex", height: "200vh", overflow: "scroll initial" }}
    >
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#EA5455"
        className="adminSidebar"
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            FunZone
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="house">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/admin/supervisors"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="chalkboard-user">
                Supervisors Requests
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/students" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Students</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/admin/users/projects"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="diagram-project">
                Projects
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/notification" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="bell">Notifications</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/admin/analytics"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/auth"
              activeClassName="activeClicked"
              onClick={handleLogout}
            >
              <CDBSidebarMenuItem icon="arrow-right-from-bracket">
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="bottom">
            <div
              className="colorOption"
              onClick={() => dispatch({ type: "LIGHT" })}
            ></div>
            <div
              className="colorOption"
              onClick={() => dispatch({ type: "DARK" })}
            ></div>
            {/* <div className="colorOption"></div> */}
          </div>

          <div
            style={{
              padding: "20px 5px",
            }}
          >
            FunZone | GDDAZ
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
