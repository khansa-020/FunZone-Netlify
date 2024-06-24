import React from "react";
import "./styles/homeFooter.css";
const HomeFooter = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <p>FunZone | GDDAZ CUI WAH</p>
        <p style={{ textAlign: "justify" }}>
          The COMSATS University Islamabad, Wah is a growing university. Housed
          in a spacious building at Wah cantonment, the campus provides
          state-of-the-art facilities for the acquisition of knowledge and
          skills.
        </p>
        <div className="social">
          <a href="/">
            <i className="uil uil-linkedin-alt"></i>
          </a>
          <a href="/">
            <i className="uil uil-twitter"></i>
          </a>
          <a href="/">
            <i className="uil uil-envelope"></i>
          </a>
        </div>
      </div>
      <ul className="footer-right">
        <li>
          <h2>Contact Us</h2>
          <ul className="boxFooter">
            <li>
              <a href="/">
                COMSATS University Islamabad, Wah Campus
                <br />
                G.T Road Wah Cantt 47040
              </a>
            </li>
            <li>
              <a href="/">(051) 9314382</a>
            </li>
            <li>
              <a
                style={{ color: "#4b4bfd", textDecoration: "underline" }}
                href="https://cuiwah.edu.pk/"
              >
                https://cuiwah.edu.pk/
              </a>
            </li>
          </ul>
        </li>
        <li className="features">
          <h2>Consoles</h2>
          <ul className="boxFooter">
            <li>
              <a href="/">Student</a>
            </li>
            <li>
              <a href="/">Supervisor</a>
            </li>
            <li>
              <a href="/">Administrator</a>
            </li>
            <li>
              <a href="/">Visitor</a>
            </li>
          </ul>
        </li>
        <li>
          <h2>Address</h2>
          <ul className="boxFooter">
            <li>
              <a href="/">Islamabad</a>
            </li>
            <li>
              <a href="/">Wah cantt.</a>
            </li>
            <li>
              <a href="/">Attock</a>
            </li>
            <li>
              <a href="/">Vehari</a>
            </li>
            <li>
              <a href="/">Abottobad</a>
            </li>
          </ul>
        </li>
      </ul>
      <div className="footer-bottom">
        <p>
          {" "}
          &copy; <span style={{ color: "#F15946" }}>CUI Wah Campus</span> All
          Rights reserved.
        </p>
      </div>
    </div>
  );
};

export default HomeFooter;
