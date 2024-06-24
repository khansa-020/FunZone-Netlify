import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LeftSide from "../components/left/LeftSide";
import TopBar from "../components/topBar/TopBar";
import "../././pages/Admin/supervisors.scss";
const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();
  // get all loggedin user projects
  const getAllProjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/projects/${params.id}/specificUserproject`
      );
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   const handleDelete = async (id) => {
  //     try {
  //       const response = await axios.delete(
  //         `http://localhost:5000/admin/${id}/deleteproject`
  //       );
  //       setResMessage(response.data.message);
  //       if (response.data.success) {
  //         message.success(response.data.message);
  //       }
  //       // Filter out the deleted user from the users array
  //       const updatedProjects = projects.filter((project) => project._id !== id);
  //       // Update the users state with the filtered array
  //       setProjects(updatedProjects);
  //     } catch (error) {
  //       console.error(error);
  //       setResMessage("Error deleting user");
  //       message.error("Error deleting project!");
  //     }
  //   };

  useEffect(() => {
    getAllProjects();
  }, []);
  // antd table col
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Status (showcase)",
      dataIndex: "status",
      render(text, record) {
        return {
          props: {
            style: {
              color: record.status === "unapproved" ? "#FF8B00" : "#00FF00",
            },
          },
          children: <div>{text}</div>,
        };
      },
    },
    // {
    //   title: "File",
    //   dataIndex: "file",
    //   render: (text, record) => <span>{record.file}</span>,
    // },
    // {
    //   title: "Image",
    //   dataIndex: "posterImg",
    //   render: (text, record) => <span>{record.posterImg}</span>,
    // },
    // {
    //   title: "Video",
    //   dataIndex: "video",
    //   render: (text, record) => <span>{record.video}</span>,
    // },

    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (text, record) => (
    //     <div className="d-flex">
    //       <button
    //         style={{ margin: "auto" }}
    //         className="btn btn-danger"
    //         onClick={() => handleDelete(record._id)}
    //       >
    //         Delete
    //       </button>
    //     </div>
    //   ),
    // },
  ];
  return (
    <>
      <TopBar />
      <main>
        <div className="Container">
          <LeftSide />
          <div className="middle">
            <Table
              columns={columns}
              dataSource={projects}
              pagination={{ pageSize: 5 }}
            />
          </div>
          {/* <RightSide /> */}
        </div>
      </main>
    </>
  );
};

export default MyProjects;
