import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "../../components/Navbar";
import "../contact/contactUs.css";
const ContactUs = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <Navbar />
      <div className="contactus">
        <h1 className="contHead">Contact Us</h1>
        <div className="contactContainer">
          <form
            className="contactusForm"
            action="https://formspree.io/f/xjvdbgwk"
            method="POST"
          >
            <input
              type="text"
              className="input"
              name="username"
              placeholder="Username"
              autoComplete="off"
              required
            />
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              autoComplete="off"
              required
            />
            <textarea
              className="input"
              name="message"
              id="message"
              cols="30"
              rows="10"
            ></textarea>
            <input type="submit" value="Send" className="butn-send" />
          </form>
        </div>
        <iframe
          data-aos="fade-up"
          title="CUI WAH FUNZONE"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.623645435993!2d72.78446691454636!3d33.74454684133089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa6bc26bfa2db%3A0x2344c019578abeac!2sCOMSATS%20University%20Islamabad%2C%20Wah%20Campus!5e0!3m2!1sen!2s!4v1671287463385!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default ContactUs;
