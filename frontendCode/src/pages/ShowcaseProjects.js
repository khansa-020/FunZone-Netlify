import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import Navbar from "./../components/Navbar";
import "./showcase.css";
import { Link } from "react-router-dom";
import HeroSection from "../components/showcaseproj/HeroSection";
import defaultImg from "../images/projdefaultimg.jpg";

import HomeFooter from "./home/HomeFooter";
const ShowcaseProjects = ({ userId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/admin/getallapprovedprojects`
        );
        setProjects(data.data);
      } catch (error) {
        message.error("Failed to fetch projects");
      }
    };
    fetchProjects();
  }, []);

  return (
    <div style={{ backgroundColor: "white" }}>
      {/* <div>
        <h2>Projects List</h2>
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.posterImg && (
                <img
                  src={`http://localhost:5000/files/${project.posterImg}`}
                  alt={project.posterImg}
                />
              )}
              {project.video && (
                <video width="320" height="240" controls>
                  <source
                    src={`http://localhost:5000/files/${project.video}`}
                    type="video/mp4"
                  />
                </video>
              )}
            </li>
          ))}
        </ul>
      </div> */}
      <Navbar />
      <HeroSection />
      {/* <h1>inside</h1> */}
      <div className="mycards">
        {projects.map((project) => (
          <div key={project._id} className="mycard card1">
            <div className="mycontainer">
              <img
                className="myimg"
                // src={`http://localhost:5000/files/${project.posterImg}`}
                src={
                  project?.posterImg ? `${project.posterImg}` : `${defaultImg}`
                }
                alt={project.posterImg}
              />
            </div>
            <div className="details">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <Link to={`/${project._id}/details`}>
                <h3>Learn More</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <HomeFooter />
    </div>
  );
};

export default ShowcaseProjects;
