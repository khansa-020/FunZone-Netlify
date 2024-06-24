import { message, Table, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../adminComp/allprojects.css";
const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [resmessage, setResMessage] = useState("");
  const [modal2Open, setModal2Open] = useState(false);
  const [recordId, setRecordId] = useState(null);
  // get all users
  const getAllProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/getallprojects");
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
      setResMessage(response.data.message);
      if (response.data.success) {
        message.success(response.data.message);
      }
      // Filter out the deleted user from the users array
      const updatedProjects = projects.filter((project) => project._id !== id);
      // Update the users state with the filtered array
      setProjects(updatedProjects);
    } catch (error) {
      console.error(error);
      setResMessage("Error deleting user");
      message.error("Error deleting project!");
    }
  };
  const handleApprove = async (record, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/${record._id}/changeprojectstatus`,
        { status: status }
      );
      if (response.data.success) {
        message.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("something went wrong!");
    }
  };
  const handleClick = (id) => {
    handleDelete(id);
    setModal2Open(false);
  };

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
    // {
    //   title: "File",
    //   dataIndex: "file",
    //   render: (text, record) => <span>{record.file}</span>,
    // },
    {
      title: "ShowCase",
      dataIndex: "showcase",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "unapproved" && (
            <button
              style={{ margin: "auto" }}
              className="btn btn-success"
              onClick={() => handleApprove(record, "approved")}
            >
              Approve
            </button>
          )}
          {record.status === "approved" && (
            <i
              style={{ margin: "auto", color: "green" }}
              className="fa-sharp fa-solid fa-circle-check"
            ></i>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <>
          <div className="d-flex">
            {record.status === "approved" && (
              <button
                style={{ margin: "auto" }}
                className="btn btn-primary"
                onClick={() => handleApprove(record, "unapproved")}
              >
                UnApprove
              </button>
            )}
            <div className="d-flex mx-2">
              <button
                style={{ margin: "auto" }}
                className="btn btn-danger"
                onClick={() => {
                  setRecordId(record._id);
                  setModal2Open(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={projects}
      />
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

export default AllProjects;
