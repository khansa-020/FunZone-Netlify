import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import DefaultImg from "../images/projdefaultimg.jpg";
import "./details.css";
const DetailPage = () => {
  const [project, setProject] = useState([]);
  const params = useParams();
  // get all users
  const getspecificProject = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/projects/${params.id}/specificproject`
      );
      if (res.data.success) {
        setProject(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getspecificProject();
  }, []);
  // function to handle download file
  const handleFileDownload = (fileId, fileName) => {
    console.log("detButn clicked");
    axios({
      url: `http://localhost:5000/projects/download`,
      method: "GET",
      responseType: "blob", // important
      params: {
        fileId: fileId, // the ID of the file you want to download
      },
    })
      .then((response) => {
        const filename = fileName;
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const downloadFile = async (fileId, fileName) => {
    const response = await fetch(
      `http://localhost:5000/projects/download/${fileId}`
    );
    const filename = fileName;
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <Navbar />
      <div className="detailContainer">
        <div className="imgContainer">
          <img
            style={{ width: "100%", display: "block" }}
            src={project?.posterImg ? `${project.posterImg}` : `${DefaultImg}`}
            alt={project.posterImg}
          />
        </div>
        <h1>Title: {project.title}</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        {project.file && (
          <div className="fileInfo">
            <h3>
              File:{" "}
              <span
                style={{
                  fontSize: "2rem",
                  textAlign: "justify",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {project.file}
              </span>
            </h3>
            <button
              className="detButn download"
              onClick={() => downloadFile(project._id, project.file)}
            >
              Download File
            </button>
          </div>
        )}

        {project.video && (
          <div className="videoContainer" style={{ marginLeft: "1%" }}>
            <video controls className="detailVideo">
              <source src={`${project.video}`} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailPage;
