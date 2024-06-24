import { DatePicker, message, TimePicker } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  hideLoading,
  showLoading,
} from "../../store/Meetingfeatures/alertSlice";
import "./meetingSchedule.css";
const MeetingSchedule = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [supervisor, setSupervisor] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const getSupervisorById = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/supervisor/getsupbyid",
        { supervisorId: params.supervisorId }
      );
      if (res.data.success) {
        setSupervisor(res.data.data);
      }
      console.log(res.data.data);
    } catch (error) {
      message.error("Something went wrong!");
      console.log(error);
    }
  };
  // --------- scheduling meeting----
  const handleScheduling = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & time required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:5000/user/schedulemeeting",
        {
          supervisorId: params.supervisorId,
          userId: user._id,
          supervisorInfo: supervisor,
          userInfo: user,
          date: date,
          time: time,
        }
      );
      console.log(`date ${date} time ${time}`);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Request sent to supervisor!");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:5000/user/checkavailability",
        { supervisorId: params.supervisorId, date, time }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    console.log(`date ${date} time ${time}`);
    getSupervisorById();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="schedule-meeting-container">
      <h1>Schedule Meeting</h1>
      {supervisor && (
        <div className="supervisor-details">
          <h2>Teacher: {supervisor.username}</h2>
          <h3>Email: {supervisor.email}</h3>

          <div className="datetime-container">
            <DatePicker
              aria-required="true"
              className="date-picker"
              format="dd-MM-yyyy"
              onChange={(value) => {
                setDate(value.toISOString());
              }}
            />
            <TimePicker
              aria-required="true"
              format="HH:mm"
              className="time-picker"
              onChange={(value) => {
                setTime(value.toISOString());
              }}
            />
          </div>

          <button
            className="check-availability-btn"
            onClick={handleAvailability}
          >
            Check Availability
          </button>

          <button className="schedule-now-btn" onClick={handleScheduling}>
            Send Request
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingSchedule;
