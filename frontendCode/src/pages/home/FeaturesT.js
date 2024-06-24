import React, { useEffect } from "react";
import "./styles/featureT.css";
import file from "../../images/source-code.png";
import Aos from "aos";
import chat from "../../images/chat.png";
import task from "../../images/taskboard.png";
import share from "../../images/shareandlike.png";
import stats from "../../images/statistics.png";
import comments from "../../images/comments.png";
import schedule from "../../images/schedule.png";
import notes from "../../images/sticky-note.png";
import img7 from "../../images/Img7.jpg";
import img9 from "../../images/Img9.jpg";
import "./styles/feature.css";
import Process from "./Process";
import { Link } from "react-router-dom";
const FeaturesT = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div style={{ backgroundColor: "white" }}>
      <h1 style={{ marginTop: "5%" }} className="text-center">
        FEATURES
      </h1>
      <div className="timeline" data-aos="fade-up">
        <div className="timelineContainer left-Container">
          <p></p>
          <div className="text-box">
            <h2>Real time Chat</h2>
            <small>one to one or Room chat</small>
            <p>You can chat with anyone in the FunZone technical community.</p>
            <span className="left-container-arrow"></span>
          </div>
        </div>
        <div className="timelineContainer right-Container">
          <p></p>
          <div className="text-box">
            <h2>Task Board</h2>
            <small>Tasks</small>
            <p>A quick way to see Tasks from all your projects in one place.</p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="timelineContainer left-Container">
          <p></p>
          <div className="text-box">
            <h2>Share Creativity</h2>
            <small>Posts</small>
            <p>
              Quickly share project ideas and get suggestions from the technical
              community.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="timelineContainer right-Container">
          <p></p>
          <div className="text-box">
            <h2>Reports</h2>
            <small>Statistics</small>
            <p>Get peace of mind by having all your work reports.</p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="timelineContainer left-Container">
          <p></p>
          <div className="text-box">
            <h2>Comments</h2>
            <small>Share views</small>
            <p>
              You can do comments on different projects and give your
              suggestions and idea freely.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="timelineContainer right-Container">
          <p></p>
          <div className="text-box">
            <h2>Schedule Meeting</h2>
            <small>Book Appointment</small>
            <p>
              Now, you don’t have to take time verbally from supervisor as
              FunZone faciltitate you to schedule meeting.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>

        <div className="timelineContainer left-Container">
          <p></p>
          <div className="text-box">
            <h2>To-do lists</h2>
            <small>keep Notes</small>
            <p>
              You can keep list of your work for your ease just like a sticky
              notes.
            </p>
            <span className="left-container-arrow"></span>
          </div>
        </div>

        <div className="timelineContainer right-Container">
          <p></p>
          <div className="text-box">
            <h2>Source files</h2>
            <small>Upload different format files</small>
            <p>
              You can share/ upload all your work e.g. apk files, media, 3D
              models etc.
            </p>
            <span className="right-container-arrow"></span>
          </div>
        </div>
      </div>
      <Process />
      <h1 style={{ marginTop: "5%" }} className="text-center">
        CATEGORIES
      </h1>
      <div className="cardConatiner">
        <Link to="/showcaseprojects">
          <div className="card text-center">
            <div
              style={{ backgroundImage: `url(${img7})` }}
              className="card_img cardImg1"
            ></div>

            <h2 style={{ color: "#E01A4F" }}>Digital Art</h2>
          </div>
        </Link>
        <Link to="/showcaseprojects">
          <div className="card text-center" data-aos="fade-right">
            <div
              style={{ backgroundImage: `url(${img9})` }}
              className="card_img cardImg2"
            ></div>

            <h2 style={{ color: "#E01A4F" }}>Games</h2>
          </div>
        </Link>
        <div className="card_txt">
          <p>
            Now, using this tool you can easily keep track of your projects and
            collaborate with your group member (s) as well as to supervisor
            without being physically present. You can showcase your work just on
            a Click!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesT;
