import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNote, updueDateNote } from "../../actions/NoteAction";
import ErrorMessage from "../../components/notes/ErrorMessage";
import Loading from "../../components/notes/Loading";
import MainScreen from "../../components/notes/MainScreen";
import { useParams } from "react-router-dom";
import { message, Modal, Table } from "antd";
import TopBar from "../../components/topBar/TopBar";
import RightSide from "../../components/right/RightSide";
import LeftSideSup from "../../components/left/LeftSideSup";
import moment from "moment";
import { FaCheck } from "react-icons/fa";
import "./timelineTasks.css";
const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [modal2Open, setModal2Open] = useState(false);
  const [recordId, setRecordId] = useState(null);
  // Get ID from URL
  const params = useParams();
  const completedTasks = tasks
    .filter((task) => task.completed)
    .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate));
  const upcomingTasks = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const renderDiamond = (task) => (
    <div key={task._id} className="diamond-wrapper">
      <div className="diamond">
        <div className="diamond-content">
          {task.completed && <FaCheck />}
          <div className="diamond-title">{task.title}</div>
          <div className="diamond-date">
            {moment(task.completed ? task.completedDate : task.dueDate).format(
              "MMM DD, YYYY"
            )}
          </div>
        </div>
      </div>
    </div>
  );
  const getAllTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/tasks/${params.id}/gettasks`
      );
      if (res.data.success) {
        setTasks(res.data.data);
      }
      //   navigate("/supervisor/students");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!");
    }
  };
  const handleTaskUpdate = async (id, completed) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}/updatetask`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (res.ok) {
        const updatedTask = await res.json();
        const updatedTasks = tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );
        setTasks(updatedTasks);
        message.success("Marked as completed!");
        // window.location.reload();
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong!");
    }
    window.location.reload();
  };

  const handleTaskDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/tasks/${id}/deletetask`
      );

      if (response.data.success) {
        message.success(response.data.message);
      }
      // Filter out the deleted user from the users array
      const updatedTasks = tasks.filter((task) => task._id !== id);
      // Update the users state with the filtered array
      setTasks(updatedTasks);
      window.reload(true);
    } catch (error) {
      window.location.reload();
      message.success("Task Deleted!");
    }
  };

  const handleClick = (id) => {
    handleTaskDelete(id);
    setModal2Open(false);
  };
  useEffect(() => {
    getAllTasks();
  }, []);

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
      title: "Due Date",
      dataIndex: "dueDate",
      render: (text, record) => (
        <span>{moment(record.dueDate).format("DD / MM / YYYY")}</span>
      ),
    },
    // {
    //   title: "Supervisor",
    //   dataIndex: "isSupervisor",
    //   render: (text, record) => (
    //     <span>{record.isSupervisor ? "Yes" : "No"}</span>
    //   ),
    // },

    {
      title: "Mark",
      dataIndex: "mark",
      render: (text, record) => (
        <div className="d-flex">
          {record.completed === false && (
            <button
              style={{ margin: "auto" }}
              className="btn btn-success"
              onClick={() => handleTaskUpdate(record._id, true)}
            >
              Completed
            </button>
          )}
          {record.completed === true && (
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
        <div className="d-flex">
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
      ),
    },
  ];

  return (
    <>
      <TopBar />
      <main>
        <div className="Container">
          <LeftSideSup />
          <div className="middle" style={{ width: "59vw", margin: "0 auto" }}>
            <div className="completed-tasks">
              <h2 style={{ marginBottom: "3rem" }}>Timeline</h2>
              {completedTasks.map((task) => renderDiamond(task))}
            </div>
            <h1
              className="text-center m-2"
              style={{ padding: "2% 0", fontWeight: "600" }}
            >
              Assigned Tasks
            </h1>
            <br />

            <Table
              style={{ margin: "0 1%" }}
              columns={columns}
              dataSource={tasks}
            />
          </div>
          {/* <RightSide /> */}
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
        <p>Are you sure, you want to delete this Task?</p>
      </Modal>
    </>
  );
};

export default AllTasks;
