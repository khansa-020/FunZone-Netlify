import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TopBar from "../../components/topBar/TopBar";
// import AllSupervisors from "../../pages/supervisor/AllSupervisors";
import RightSide from "../../components/right/RightSide";
import LeftSideSup from "../../components/left/LeftSideSup";
import { useNavigate } from "react-router-dom";
import "../Admin/supervisors.scss";
import AddStudent from "../../components/supervisorComp/AddStudent";
import { useSelector } from "react-redux";

const AllStudents = () => {
  // Get ID from URL
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.authReducer.authData);
  // get all supervised students
  const [addedUsers, setAddedUsers] = useState([]);

  useEffect(() => {
    const fetchAddedUsers = async () => {
      const response = await axios.get(
        `http://localhost:5000/admin/${user._id}/getallsupstudents`
      );
      setAddedUsers(response.data);
    };
    fetchAddedUsers();
  }, [user._id]);

  // antd table col
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    // {
    //   title: "Supervisor",
    //   dataIndex: "isSupervisor",
    //   render: (text, record) => (
    //     <span>{record.isSupervisor ? "Yes" : "No"}</span>
    //   ),
    // },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button
            // href={`/task/${record._id}`}
            className="btn btn-success  m-2"
            onClick={() => navigate(`/task/${record._id}`)}
          >
            Assign Task
          </button>
          <button
            // href={`/task/${record._id}`}
            className="btn btn-primary m-2"
            onClick={() => navigate(`/alltasks/${record._id}`)}
          >
            View Tasks
          </button>
          <button
            // href={`/task/${record._id}`}
            className="btn btn-secondary m-2"
            onClick={() => navigate(`/allfiles/${record._id}`)}
          >
            View Files
          </button>
          <button
            // href={`/task/${record._id}`}
            className="btn btn-info m-2"
            onClick={() => navigate(`/userprojects/${record._id}`)}
          >
            View Projects
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <TopBar />
      <main>
        <div className="Container">
          <LeftSideSup />
          <div className="middle">
            <h1
              className="text-center m-2"
              style={{ padding: "2% 0", fontWeight: "600" }}
            >
              My Students (Under My Supervision)
            </h1>
            <br />

            <Table
              style={{ margin: "0 1%" }}
              columns={columns}
              dataSource={addedUsers}
            />
          </div>
          {/* <RightSide /> */}
          <AddStudent />
        </div>
      </main>
    </>
  );
};

export default AllStudents;
