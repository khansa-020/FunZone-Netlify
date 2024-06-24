import React from "react";
import { useNavigate } from "react-router-dom";

const SupervisorList = ({ supervisor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card p-2 m-2"
        style={{ width: "100%", cursor: "pointer" }}
        onClick={() =>
          navigate(`/supervisor/schedulemeeting/${supervisor._id}`)
        }
      >
        <div className="card-header">Teacher: {supervisor.username}</div>
        <div className="card-body">
          <p>
            <b>Email</b> {supervisor.email}
          </p>
          <p>
            <b>Designation</b> {supervisor.designation}
          </p>
          <p>
            <b>Department</b> {supervisor.department}
          </p>
          <p>
            <b>Timings</b> {supervisor.timings[0]} - {supervisor.timings[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default SupervisorList;
