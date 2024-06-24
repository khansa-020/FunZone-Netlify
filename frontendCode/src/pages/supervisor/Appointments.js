import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import "../Admin/supervisors.scss";
import TopBar from "../../components/topBar/TopBar";
import LeftSide from "../../components/left/LeftSide";

const Appointments = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [appointments, setAppointments] = useState([]);
  const appointmentsList = async () => {
    try {
      //   const res = await axios.get(
      //     "http://localhost:5000/admin/userappointmentslist",
      //     { userId: user._id }
      //   );
      const res = await axios.post(
        "http://localhost:5000/admin/userappointmentslist",
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
  useEffect(() => {
    appointmentsList();
  }, []);
  const columns = [
    // {
    //   title: "Name",
    //   dataIndex: "username",
    //   render: (text, record) => <span>{record.supervisorId.username}</span>,
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "contact",
    //   render: (text, record) => <span>{record.supervisorId.contact}</span>,
    // },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <div>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render(text, record) {
        return {
          props: {
            style: {
              color:
                record.status === "pending"
                  ? "#FF8B00"
                  : record.status === "approved"
                  ? "#00FF00"
                  : "#FF0000",
            },
          },
          children: <div>{text}</div>,
        };
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      {/* <h1 className="text-center" style={{ padding: "2%" }}>
        Meeting Appointments List
      </h1>
      <Table columns={columns} dataSource={appointments} /> */}
      <TopBar />
      <main>
        <div className="Container">
          <LeftSide />
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
          {/* <RightSide /> */}
        </div>
      </main>
    </>
  );
};

export default Appointments;
