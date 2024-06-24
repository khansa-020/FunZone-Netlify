import React from "react";
// import projAnimation from "../../animations/project-process.json";
import projAnimation from "../../animations/process-animation.json";
import Lottie from "react-lottie";

const Process = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: projAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      color: "red",
    },
  };

  return (
    <div style={{ margin: "0 0 5% 0", padding: "3% 0" }}>
      <h1
        style={{ margin: "2% 0 5% 0", fontWeight: "600" }}
        className="text-center"
      >
        QUALITY PROJECT BUILDING PROCESS
      </h1>
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default Process;
