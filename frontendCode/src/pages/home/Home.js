import React, { useEffect } from "react";

// import Navbar from "../Navbar";
// import Content from "../Content";
import Features from "./Features";
// import Footer from "../Footer";
import HeroSection from "./HeroSection";
import Contact from "./Contact";
import HomeFooter from "./HomeFooter";
import Navbar from "../../components/Navbar";
import FeaturesT from "./FeaturesT";
import VideoSec from "./VideoSec";
import HeroSect from "./HeroSect";
// import News from '../News';
// import { BrowserRouter as Router } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar />
      <HeroSection />
      {/* <HeroSect /> */}
      <VideoSec />
      {/* <Content/> */}
      {/* <Features /> */}
      <FeaturesT />
      {/* <News/> */}
      <Contact />
      {/* <Footer/> */}
      <HomeFooter />
    </div>
  );
};

export default Home;
