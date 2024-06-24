import React, { useState } from "react";
import "../pages/home/styles/navbar.css";
// import logo from '../images/comsatslogo.png';
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
// import {Link} from 'react-router-dom'
const Navbar = () => {
  const [showNavMob, setShowNavMob] = useState(false);
  const navigate = useNavigate();
  const authentication = () => {
    navigate("/auth");
  };
  return (
    <>
      <nav className="main-nav">
        {/* logo */}
        <div className="logo">
          {/* <ul> */}
          {/* <li><img src={logo} alt='logo' href="/home"/></li> */}
          <h1>
            Fun<span style={{ color: "#F15946" }}>Zone</span>
          </h1>
          {/* </ul> */}
        </div>
        {/* nav-links */}
        <div
          className={
            showNavMob ? "navbar-link mobile-navbar-link" : "navbar-link"
          }
        >
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contactus">Contact Us</Link>
            </li>
            <li>
              <Link to="/showcaseprojects">Projects</Link>
            </li>
            <li>
              <Link to="/artistictools">Tools</Link>
            </li>
            <li onClick={authentication} className="onmob">
              <a href="/auth">Account</a>
            </li>
            {/* <li onClick={authentication} className='onmob'><a href='/signup'>Signup</a></li> */}
          </ul>
        </div>
        {/* account btns */}
        <div className="AccountBtn">
          <button
            style={{ visibility: "hidden" }}
            onClick={authentication}
            className="butn signup"
          >
            Sign up
          </button>
          <button onClick={authentication} className="butn login">
            Account
          </button>
        </div>
        <div className={showNavMob ? "hamburgerCross" : "hamburger-menu"}>
          <button
            className="iconHamburger"
            onClick={() => setShowNavMob(!showNavMob)}
          >
            {showNavMob ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
