import { message, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LeftSide from "../../components/left/LeftSide";
import PostShare from "../../components/PostShare/PostShare";
import RightSide from "../../components/right/RightSide";
import SupervisorList from "../../components/supervisorComp/SupervisorList";
import TopBar from "../../components/topBar/TopBar";

const AllSupervisors = () => {
  const [supervisors, setSupervisors] = useState([]);
  const getAllSupervisors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/admin/getallapprovedsupervisors"
      );
      if (res.data.success) {
        setSupervisors(res.data.data);
      }
      console.log(res.data.data);
    } catch (error) {
      message.error("Something went wrong!");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSupervisors();
  }, []);

  return (
    <>
      <TopBar />
      <main>
        <div className="Container">
          <LeftSide />
          <div className="middle">
            <PostShare />
            <>
              <h1 className="text-center">All Supervisors</h1>
              <Row>
                {supervisors &&
                  supervisors.map((supervisor) => (
                    <SupervisorList supervisor={supervisor} />
                  ))}
              </Row>
            </>
          </div>
          <RightSide />
        </div>
      </main>
    </>
  );
};

export default AllSupervisors;
