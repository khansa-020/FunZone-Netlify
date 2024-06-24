import { message, Tabs } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/adminComp/sidebar/Sidebar";
import LeftSideSup from "../../components/left/LeftSideSup";
import {
  hideLoading,
  showLoading,
} from "../../store/Meetingfeatures/alertSlice";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/user/getallnotification",
        { userId: user._id },
        config
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        localStorage.setItem("profile", JSON.stringify(res.data.data));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/user/deleteallnotification",
        { userId: user._id },
        config
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        localStorage.setItem("profile", JSON.stringify(res.data.data));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="admin">
        {user.isSupervisor ? <LeftSideSup /> : <Sidebar />}
        <div className="adminContainer">
          <h1
            className="text-center m-2"
            style={{ padding: "2% 0", fontWeight: "600" }}
          >
            Students
          </h1>
          <div>
            <h1 className="p-3 text-center">Notifications</h1>
            <Tabs style={{ marginLeft: "1%" }}>
              <Tabs.TabPane tab="UnSeen" key={0}>
                <div className="d-flex justify-content-end">
                  <h4
                    className="p-2"
                    style={{
                      cursor: "pointer",
                      color: "hsl(120deg 79.15% 48.35%)",
                      fontWeight: "600",
                      textDecoration: "underline",
                    }}
                    onClick={handleMarkAllRead}
                  >
                    Mark All as Read
                  </h4>
                </div>
                {user?.notification.map((notificationMsg) => (
                  <div
                    className="card note"
                    style={{
                      cursor: "pointer",
                      padding: "1% ",
                      margin: "0 1% 1%",
                    }}
                  >
                    <div
                      className="card-text"
                      onClick={() => navigate(notificationMsg.onClickPath)}
                    >
                      {notificationMsg.message}
                    </div>
                  </div>
                ))}
              </Tabs.TabPane>

              <Tabs.TabPane tab="Seen" key={1}>
                <div className="d-flex justify-content-end">
                  <h4
                    className="p-2 text-danger"
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontWeight: "600",
                      textDecoration: "underline",
                    }}
                    onClick={handleDeleteAllRead}
                  >
                    Delete All as Read
                  </h4>
                </div>
                {user?.seenNotification.map((notificationMsg) => (
                  <div
                    className="card note"
                    style={{
                      cursor: "pointer",
                      padding: "1%",
                      margin: "0 1% 1%",
                    }}
                  >
                    <div
                      className="card-text"
                      onClick={() => navigate(notificationMsg.onClickPath)}
                    >
                      {notificationMsg.message}
                    </div>
                  </div>
                ))}
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
