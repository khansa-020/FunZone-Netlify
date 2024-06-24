import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { FaCheck } from "react-icons/fa";
import "../taskboard/task.css";
const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const getAllTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/tasks/${user._id}/gettasks`
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
  useEffect(() => {
    getAllTasks();
  }, []);
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
  return (
    <>
      <div className="middle">
        <div className="completed-tasks">
          <h2 style={{ marginBottom: "3rem" }}>Timeline</h2>
          {completedTasks.map((task) => renderDiamond(task))}
        </div>
        <h1>Your TaskBoard</h1>
        <br />

        <table id="tasks">
          {/* style={{ color: "var(--color-primary)" }} */}
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "1.5rem" }}>
            {tasks.map((task) => (
              <tr>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.completed ? "Compeleted" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskBoard;
