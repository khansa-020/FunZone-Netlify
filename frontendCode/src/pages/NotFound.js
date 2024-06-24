import React from "react";
import { useNavigate } from "react-router-dom";
// import NotFoundPage from "./../../../frontend/src/images/NotFoundPage.png";
import "./notFound.css";
const NotFound = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="NotFoundContainer">
        <div className="BackgroundImage ">
          <div className="ContentWrapper">
            <h1>The page you're looking for does not exist.</h1>
            <p>Please check the URL or navigate back to the homepage.</p>
            <button className="notFoundButn" onClick={backToHome}>
              Back To Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
