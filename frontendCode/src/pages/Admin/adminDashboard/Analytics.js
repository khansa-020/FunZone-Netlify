import React from "react";
import Chart from "../../../components/adminComp/chart/Chart";
import Featured from "../../../components/adminComp/featuredchart/Featured";
import Navbar from "../../../components/adminComp/navbar/Navbar";
import Sidebar from "../../../components/adminComp/sidebar/Sidebar";
import Table from "../../../components/adminComp/table/Table";
import Widget from "../../../components/adminComp/widgets/Widget";
import "../adminDashboard/dashboard.scss";
import { Helmet } from "react-helmet";
import ProjectsChart from "../../../components/adminComp/ProjectsChart";
import CategoryPercentagePieChart from "../../../components/adminComp/CategoryPercentagePieChart";
import "../adminDashboard/admindashboard.css";
const Analytics = () => {
  return (
    <div className="admin">
      {/* <Helmet>
                <style>{'body { background-color: #fff }'}</style>
      </Helmet> */}
      <Sidebar />
      <div className="adminContainer">
        <Navbar />
        {/* <div className="widgets">
          <Widget type="Students" />
          <Widget type="Supervisors" />
          <Widget type="Projects" />
          <Widget type="Top" />
        </div> */}
        <div className="charts" style={{ marginTop: "5%" }}>
          <Featured />
          <CategoryPercentagePieChart />
        </div>
        <div className="listContainer">
          <div className="listTitle">
            Total number of Projects uploaded by students in Each Month
          </div>
          {/* <Table /> */}
          <ProjectsChart title="Projects Created Per Month" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
