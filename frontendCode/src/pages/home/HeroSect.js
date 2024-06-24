import React from "react";
import { useNavigate } from "react-router-dom";
import gamecontroller from "../../animations/game-controller.json";
import Lottie from "react-lottie";
import "./styles/heroSec.css";
const HeroSect = () => {
  const navigate = useNavigate();
  const authPage = () => {
    navigate("/auth");
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: gamecontroller,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      color: "red",
    },
  };
  return (
    <>
      <div className="heroSec">
        <div className="content">
          <h2>FunZone CUI WAH</h2>
          <p className="heroText">
            The Game Development and Digital Arts Zone (GDDAZ) society, composed
            of different groups showcased their Profiles /Design of projects
            resulting in a week's time with their individual concept of game
            development and digital arts to Director Campus, Prof. Dr. Muhammad
            Abid,T.I., on October 13, 2022. The worthy Director Campus
            appreciated the leading role of Assistant Professor, Dr Mudassar
            Raza and students’ tasks and urged them to work hard toward product
            development and to become leading professionals. The newly joined
            students also participated and got the motivation from their
            seniors’ work. Regular meetings each week with progress will be done
            to guide, facilitate and get their good work monitored and
            showcased.Planning and collaboration tools make project management
            easier !
          </p>
          <button onClick={authPage} className="getStarted">
            GetStarted
          </button>
        </div>
        <div className="animation">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </>
  );
};

export default HeroSect;
