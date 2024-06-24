import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/adminComp/sidebar/Sidebar";
import Navbar from "../../../components/adminComp/navbar/Navbar";
import Chart from "../../../components/adminComp/chart/Chart";
import List from "../../../components/adminComp/table/Table";
import "../single/single.scss";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import ProjectsChart from "../../../components/adminComp/ProjectsChart";
import AllProjects from "../../../components/adminComp/AllProjects";
import AdminProfileModal from "../../../components/adminComp/AdminProfileModal";
import { useParams } from "react-router-dom";
import * as UserApi from "../../../api/UserRequest.js";
import profile from "../../../images/defaultProfile.png";
const Single = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();
  const profileUserId = user._id;
  const [profileUser, setProfileUser] = useState({});
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);
  return (
    <div className="single">
      {/* <Helmet>
                <style>{'body { background-color: #fff }'}</style>
      </Helmet> */}
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="leftTop">
            {/* <div className="editButton" onClick={() => setModalOpened(true)}>
              Edit
            </div>
            <AdminProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            /> */}
            {user._id === profileUserId ? (
              <div className="editButton" onClick={() => setModalOpened(true)}>
                Edit
                <AdminProfileModal
                  modalOpened={modalOpened}
                  setModalOpened={setModalOpened}
                  data={user}
                />
              </div>
            ) : (
              ""
            )}
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={
                  profileUser.profilePicture
                    ? `${profileUser.profilePicture}`
                    : profile
                }
                alt="profileImg"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{profileUser.username}</h1>
                <div className="detailItem">
                  <div className="itemKey">Email: </div>
                  <div className="itemValue">{profileUser.email} </div>
                </div>
                <div className="detailItem">
                  <div className="itemKey">Contact: </div>
                  <div className="itemValue">94546546547</div>
                </div>
                <div className="detailItem">
                  <div className="itemKey">Works At: </div>
                  <div className="itemValue">CUI | WAH</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rightTop">
            {/* <Chart aspect={3 / 1} title="Students projects(last 7 Months)" /> */}
            <ProjectsChart title="Projects Created Per Month" aspect={2 / 1} />
          </div>
        </div>
        <div className="bottom">
          {/* <h1 className="title">All Projects</h1> */}
          {/* <List /> */}
          <AllProjects />
        </div>
      </div>
    </div>
  );
};

export default Single;
