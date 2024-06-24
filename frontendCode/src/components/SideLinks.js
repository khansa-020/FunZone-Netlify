import React from "react";
import { useSelector } from "react-redux";

const SideLinks = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const supervisorMenu = [
    {
      title: "Home",
      path: "/",
      icon: "uil uil-home",
    },
    {
      title: "Profile",
      path: `/profile/${user._id}`,
      icon: "uil uil-user-circle",
    },
    {
      title: "Taskboard",
      path: `/uploads/${user._id}`,
      icon: "uil uil-upload",
    },
    {
      title: "Toggle",
      path: `/profile/${user._id}`,
      icon: "uil uil-palette",
    },
    {
      title: "Profile",
      path: `/profile/${user._id}`,
      icon: "uil uil-user-circle",
    },
  ];

  return <div>SideLinks</div>;
};

export default SideLinks;
