import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultImg from "../../images/projdefaultimg.jpg";
// import { useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";

const StudentProjects = () => {
  const [projects, setProjects] = useState([]);
  // const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();
  // get all loggedin user projects
  const getAllProjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/projects/${params.id}/specificUserproject`
      );
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   const handleDelete = async (id) => {
  //     try {
  //       const response = await axios.delete(
  //         `http://localhost:5000/admin/${id}/deleteproject`
  //       );
  //       setResMessage(response.data.message);
  //       if (response.data.success) {
  //         message.success(response.data.message);
  //       }
  //       // Filter out the deleted user from the users array
  //       const updatedProjects = projects.filter((project) => project._id !== id);
  //       // Update the users state with the filtered array
  //       setProjects(updatedProjects);
  //     } catch (error) {
  //       console.error(error);
  //       setResMessage("Error deleting user");
  //       message.error("Error deleting project!");
  //     }
  //   };

  useEffect(() => {
    getAllProjects();
  }, []);
  return (
    <>
      {projects ? (
        <div className="mycards">
          {projects ? (
            <>
              {" "}
              {projects.map((project) => (
                <div key={project._id} className="mycard card1">
                  <div className="mycontainer">
                    <img
                      className="myimg"
                      // src={`http://localhost:5000/files/${project.posterImg}`}
                      src={
                        project?.posterImg
                          ? `${project.posterImg}`
                          : `${DefaultImg}`
                      }
                      alt={project.posterImg}
                    />
                  </div>
                  <div className="details">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <Link to={`/${project._id}/details`}>
                      <h3>Learn More</h3>
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No projects yet</p>
          )}
        </div>
      ) : (
        <h3 className="text-info text-center">No Project yet</h3>
      )}
    </>
  );
};

export default StudentProjects;
