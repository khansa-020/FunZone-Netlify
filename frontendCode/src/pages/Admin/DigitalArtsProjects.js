import { message, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/adminComp/sidebar/Sidebar";
import TopBar from "../../components/topBar/TopBar";
const DigitalArtsProjects = () => {
  const [projects, setProjects] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const [recordId, setRecordId] = useState(null);
  // get all users
  const getAllDigitalArtsProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/getalldigitalartsprojects"
      );
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/${id}/deleteproject`
      );
      //  setResMessage(response.data.message);
      if (response.data.success) {
        message.success(response.data.message);
      }
      // Filter out the deleted user from the users array
      const updatedProjects = projects.filter((project) => project._id !== id);
      // Update the users state with the filtered array
      setProjects(updatedProjects);
    } catch (error) {
      console.error(error);
      //  setResMessage("Error deleting user");
      message.error("Error deleting project!");
    }
  };
  const handleClick = (id) => {
    handleDelete(id);
    setModal2Open(false);
  };

  useEffect(() => {
    getAllDigitalArtsProjects();
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
      title: "File",
      dataIndex: "file",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button
            className="btn btn-danger"
            onClick={() => {
              setRecordId(record._id);
              setModal2Open(true);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="admin">
        <Sidebar />
        <div className="adminContainer">
          <h1
            className="text-center m-2"
            style={{ padding: "2% 0", fontWeight: "600" }}
          >
            Digital Arts Projects
          </h1>
          <Table
            style={{ margin: "0 1%" }}
            columns={columns}
            dataSource={projects}
          />
        </div>
      </div>

      <Modal
        title="Confirmation"
        okText="Delete"
        okType="danger"
        centered
        open={modal2Open}
        onOk={() => handleClick(recordId)}
        onCancel={() => {
          setModal2Open(false);
          setRecordId(null);
        }}
      >
        <p>Are you sure, you want to delete this project permanently?</p>
      </Modal>
    </>
  );
};

export default DigitalArtsProjects;
