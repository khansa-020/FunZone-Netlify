import React, { useEffect, useState } from "react";
import "../widgets/widget.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import BarChartIcon from "@mui/icons-material/BarChart";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import { Link } from "react-router-dom";
const Widget = ({ type }) => {
  const [studentCount, setStudentCount] = useState(null);
  const [supervisorCount, setSupervisorCount] = useState(null);
  const [gameProjectsCount, setGameProjectsCount] = useState(null);
  const [digitalArtsProjectsCount, setDigitalArtsProjectsCount] =
    useState(null);
  useEffect(() => {
    async function getCount() {
      const response = await fetch(
        "http://localhost:5000/admin/students/count"
      );
      const data = await response.json();
      setStudentCount(data.count);
    }
    async function getSupervisorCount() {
      const response = await fetch(
        "http://localhost:5000/admin/supervisors/count"
      );
      const data = await response.json();
      setSupervisorCount(data.count);
    }
    async function getGameDevCount() {
      const response = await fetch(
        "http://localhost:5000/admin/gamedevelopment/count"
      );
      const data = await response.json();
      setGameProjectsCount(data.count);
    }
    async function getDigitalArtsCount() {
      const response = await fetch(
        "http://localhost:5000/admin/digitalarts/count"
      );
      const data = await response.json();
      setDigitalArtsProjectsCount(data.count);
    }
    getCount();
    getSupervisorCount();
    getGameDevCount();
    getDigitalArtsCount();
  }, []);
  let data;
  switch (type) {
    case "Students":
      data = {
        title: "Students",
        link: "See all Students",
        path: "/admin/students",
        counter:
          studentCount !== null ? <p>{studentCount}</p> : <p>Loading...</p>,
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{
              color: "var(--color-white)",
              backgroundColor: "var(--color-primary)",
            }}
          />
        ),
      };
      break;
    case "Supervisors":
      data = {
        title: "Supervisors",
        link: "See all Supervisors",
        path: "/admin/supervisors",
        counter:
          supervisorCount !== null ? (
            <p>{supervisorCount}</p>
          ) : (
            <p>Loading...</p>
          ),
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{
              color: "var(--color-white)",
              backgroundColor: "var(--color-secondary)",
            }}
          />
        ),
      };
      break;
    case "Projects":
      data = {
        title: "Projects (Gaming)",
        link: "See all ",
        path: "/admin/gamingprojects",
        counter:
          gameProjectsCount !== null ? (
            <p>{gameProjectsCount}</p>
          ) : (
            <p>Loading...</p>
          ),
        icon: (
          <BorderAllIcon
            className="icon"
            style={{
              color: "var(--color-white)",
              backgroundColor: "rgb(14, 5, 141)",
            }}
          />
        ),
      };
      break;
    case "Top":
      data = {
        title: "Projects (Digital Arts)",
        link: "See all ",
        path: "/admin/digitalartsprojects",
        counter:
          digitalArtsProjectsCount !== null ? (
            <p>{digitalArtsProjectsCount}</p>
          ) : (
            <p>Loading...</p>
          ),
        icon: (
          <CastForEducationIcon
            className="icon"
            style={{
              color: "var(--color-white)",
              backgroundColor: "rgb(32, 221, 142)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <>
      <div className="widget">
        <div className="leftWidgets">
          <div className="title">{data.title}</div>
          <div className="counter">{data.counter}</div>
          <Link to={data.path}>
            <div className="link">{data.link}</div>
          </Link>
        </div>
        <div className="rightWidgets">
          <div className="percentage positive">
            <BarChartIcon />
          </div>
          {/* <PersonOutlineIcon className='icon'/> */}
          {data.icon}
        </div>
      </div>
    </>
  );
};

export default Widget;
