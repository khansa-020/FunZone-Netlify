import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./styles/contact.css";
import background from "../../images/bgContact.jpg";
import { Link } from "react-router-dom";
const Contact = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        className="contact"
        data-aos="fade-up"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${background}")`,
        }}
      >
        <h1 data-aos="fade-left">For More Details Contact Us</h1>
        <Link data-aos="fade-right" to="/contactus" className="contactButn">
          CONTACT US
        </Link>
      </div>
    </div>
  );
};

export default Contact;
