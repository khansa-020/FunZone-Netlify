import React, { useEffect } from "react";
import Aos from "aos";
// import bgVideo from "../../images/FUNZONEvideo.mp4";
import "./styles/videosec.css";
function VideoWithText() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div style={{ backgroundColor: "white" }}>
      <h1 style={{ marginTop: "5%" }} className="text-center">
        GET TO KNOW OUR PLATFORM
      </h1>
      <div className="container" style={{ marginTop: "5%" }} data-aos="fade-up">
        <div className="video-container">
          {/* <iframe
            src={"https://youtu.be/AC__ryqKiGE"}
            title="FunZone Demo (Video)"
            autoPlay
            allowFullScreen
          ></iframe> */}
          <iframe
            src="https://www.youtube.com/embed/AC__ryqKiGE"
            title="FunZone Demo (Video)"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          {/* <video controls>
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        </div>
        <div className="text-container">
          {/* <h2>FunZone Demo </h2> */}
          <p className="vtext">
            <span style={{ fontWeight: "600", color: "var(--color-primary)" }}>
              FunZone
            </span>{" "}
            is a Social Media platform where you can share your work "Related to
            Game Development & Digital Arts" and get appreciated by your fellows
            and teachers. Moreover, you can upload your projects and keep track
            of your upcoming and ongoing tasks.
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoWithText;
