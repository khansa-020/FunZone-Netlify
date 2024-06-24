import React from "react";
import { useSelector } from "react-redux";
import LeftSide from "../components/left/LeftSide";
import MiddleSide from "../components/middle/MiddleSide";
import RightSide from "../components/right/RightSide";
import TopBar from "../components/topBar/TopBar";
import AdminDashboard from "./Admin/adminDashboard/AdminDashboard";
import AllStudents from "./supervisor/AllStudents";

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <>
      {user.isAdministrator ? (
        <AdminDashboard />
      ) : user.isSupervisor ? (
        <AllStudents />
      ) : (
        <>
          <TopBar />
          <main>
            <div className="Container">
              <LeftSide />
              <MiddleSide />
              <RightSide />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default StudentDashboard;
