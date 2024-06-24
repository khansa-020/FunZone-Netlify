import { message, Table, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/adminComp/sidebar/Sidebar";
import ProfileModalAdmin from "../../components/user/ProfileModalAdmin";

import "./supervisors.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modalOpened, setModalOpened] = useState(false); // for edit user
  const [modal2Open, setModal2Open] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null); // Newly added state variable

  const navigate = useNavigate();
  const handleDeactivate = async (record, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/auth/${record._id}/changeprojectstatusdeactive`,
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
  // get all users
  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/getallusers");
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/${id}/deleteuser`
      );

      if (response.data.success) {
        message.success(response.data.message);
      }
      // Filter out the deleted user from the users array
      const updatedUsers = users.filter((user) => user._id !== id);
      // Update the users state with the filtered array
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
      message.error("Error deleting project!");
    }
  };
  const handleWarning = async (username, email) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/user/sendwarning`,
        { username, email }
      );
      message.success("Warning sent!");
      window.alert("Warning sent!");
    } catch (error) {
      console.error(error);
      console.log(email);
      console.log(username);
      message.error("Something went wrong. Please try later!");
    }
  };

  const handleClick = (id) => {
    handleDelete(id);
    setModal2Open(false);

    // Check if the deleted record was the selected record
    if (selectedRecord && selectedRecord._id === id) {
      setSelectedRecord(null); // Clear the selected record
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
    {
      title: "Account Status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "active" && (
            <button
              style={{ margin: "auto" }}
              className="btn btn-dark"
              onClick={() => handleDeactivate(record, "deactivate")}
            >
              Deactivate
            </button>
          )}
          {record.status === "deactivate" && (
            <button
              style={{ margin: "auto" }}
              className="btn btn-success"
              onClick={() => handleDeactivate(record, "active")}
            >
              Activate
            </button>
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
            <button
              className="btn btn-danger"
              onClick={() => {
                setRecordId(record._id);
                setModal2Open(true);
              }}
            >
              Delete
            </button>

            <button
              className="btn btn-success mx-2"
              onClick={() => {
                setSelectedRecord(record); // Set the selected record
                setModalOpened(true);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-primary mx-2"
              onClick={() => navigate(`/admin/postsview/${record._id}`)}
            >
              Posts
            </button>
            <button
              className="btn btn-warning mx-2"
              onClick={() => handleWarning(record.username, record.email)}
            >
              Send warning
            </button>
          </div>
        </>
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
            Students
          </h1>
          <Table
            style={{ margin: "0 1%" }}
            columns={columns}
            dataSource={users}
          />
        </div>
      </div>
      <Modal
        title="Confirmation"
        okText="Delete"
        okType="danger"
        centered
        visible={modal2Open}
        onOk={() => handleClick(recordId)}
        onCancel={() => {
          setModal2Open(false);
          setRecordId(null);
        }}
      >
        <p>Are you sure you want to delete this account permanently?</p>
      </Modal>
      {selectedRecord && (
        <ProfileModalAdmin
          key={selectedRecord._id} // Add a unique key to force re-rendering of the modal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={selectedRecord}
        />
      )}
    </>
  );
};

export default Users;
