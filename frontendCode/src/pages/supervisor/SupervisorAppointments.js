import { message, Table, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RightSide from "../../components/right/RightSide";
import TopBar from "../../components/topBar/TopBar";
import LeftSideSup from "../../components/left/LeftSideSup";
const SupervisorAppointments = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [modal2Open, setModal2Open] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const appointmentsList = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/supervisor/supervisorappointments",
        {
          userId: user._id,
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        setAppointments(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    appointmentsList();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/supervisor/updateappointmentstatus",
        {
          appointmentsId: record._id,
          status,
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        appointmentsList();
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/supervisor/${id}/deleteappointment`
      );
      if (response.data.success) {
        message.success(response.data.message);
      }
      // Filter out the deleted user from the users array
      const updatedAppointments = appointments.filter(
        (appointment) => appointment._id !== id
      );
      // Update the users state with the filtered array
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error(error);
      message.error("Error deleting Appointment!");
    }
  };
  const handleClick = (id) => {
    handleDelete(id);
    setModal2Open(false);
  };
  const columns = [
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
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
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-warning ms-2"
                onClick={() => handleStatus(record, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
          <button
            className="btn btn-danger ms-2"
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
      <TopBar />
      <main>
        <div className="Container">
          <LeftSideSup />
          <div className="middle">
            <h1
              className="text-center m-2"
              style={{ padding: "2% 0", fontWeight: "600" }}
            >
              Meeting Appointments List
            </h1>
            <br />

            <Table columns={columns} dataSource={appointments} />
          </div>
          <RightSide />
        </div>
      </main>

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
        <p>Are you sure, you want to delete it?</p>
      </Modal>
    </>
  );
};

export default SupervisorAppointments;
