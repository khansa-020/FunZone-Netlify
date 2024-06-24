import { message, Table, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/adminComp/sidebar/Sidebar";
import ProfileModalAdmin from "../../components/user/ProfileModalAdmin";

import "./supervisors.scss";
const Supervisors = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [modalOpened, setModalOpened] = useState(false); // for edit user
  const [modal2Open, setModal2Open] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null); // Newly added state variable
  const handleClick = (id) => {
    handleRequestDelete(id);
    setModal2Open(false);

    // Check if the deleted record was the selected record
    if (selectedRecord && selectedRecord._id === id) {
      setSelectedRecord(null); // Clear the selected record
    }
  };
  const handleAccountClick = (id) => {
    handleDelete(id);
    setModal2Open(false);
  };
  // get all supervisors
  const getAllSupervisors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/getallsupervisors"
      );
      if (res.data.success) {
        setSupervisors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/changeaccountstatus",
        { supervisorId: record._id, userId: record.userId, status: status }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("something went wrong!");
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/${id}/deletesupervisor`
      );

      if (response.data.success) {
        message.success(response.data.message);
      }
      // Filter out the deleted user from the users array
      const updatedSupervisors = supervisors.filter(
        (supervisor) => supervisor._id !== id
      );
      // Update the users state with the filtered array
      setSupervisors(updatedSupervisors);
    } catch (error) {
      console.error(error);
      message.error("Error deleting Supervisor Account!");
    }
  };
  const handleRequestDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/${id}/deleterequest`
      );

      if (response.data.success) {
        message.success(response.data.message);
      }
      // Filter out the deleted user from the users array
      const updatedSupervisors = supervisors.filter(
        (supervisor) => supervisor._id !== id
      );
      // Update the users state with the filtered array
      setSupervisors(updatedSupervisors);
    } catch (error) {
      console.error(error);
      message.error("Error deleting Supervisor Account Request!");
    }
  };
  useEffect(() => {
    getAllSupervisors();
  }, []);
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
      title: "Department",
      dataIndex: "Department",
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <>
              <button
                className="btn btn-success"
                onClick={() => handleAccountStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger mx-2"
                onClick={() => {
                  setRecordId(record._id);
                  setModal2Open(true);
                }}
              >
                Delete Request
              </button>
            </>
          ) : (
            <>
              {/* <button
                className="btn btn-success"
                onClick={() => {
                  setSelectedRecord(record); // Set the selected record
                  setModalOpened(true);
                }}
              >
                Edit
              </button> */}

              <button
                className="btn btn-danger mx-2"
                onClick={() => {
                  setRecordId(record._id);
                  setModal2Open(true);
                }}
              >
                Delete Account
              </button>
            </>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      {/* <TopBar /> */}
      <div className="admin">
        <Sidebar />
        <div className="adminContainer">
          <h1
            className="text-center m-2"
            style={{ padding: "2% 0", fontWeight: "600" }}
          >
            Supervisor Requests
          </h1>
          <Table
            style={{ margin: "0 1%" }}
            columns={columns}
            dataSource={supervisors}
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
        <p>
          Are you sure, you want to delete this Supervisor account's request?
        </p>
      </Modal>
      <Modal
        title="Confirmation"
        okText="Delete"
        okType="danger"
        centered
        open={modal2Open}
        onOk={() => handleAccountClick(recordId)}
        onCancel={() => {
          setModal2Open(false);
          setRecordId(null);
        }}
      >
        <p>Are you sure, you want to delete this account permanently?</p>
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

export default Supervisors;
