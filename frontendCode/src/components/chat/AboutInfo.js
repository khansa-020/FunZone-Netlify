import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import profile from "../../images/defaultProfile.png";
import "./aboutInfo.css";

const AboutInfo = ({ user, children }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <>
      {/* <p onClick={handleShow}>click me</p> */}

      {children ? (
        <span onClick={handleShow}>{children}</span>
      ) : (
        <>
          <i
            onClick={handleShow}
            style={{
              cursor: "pointer",
              padding: "1rem 0 0 92.75rem",
              color: "#f15a46",
            }}
            className="fa-sharp fa-regular fa-eye"
          ></i>
          {/* {user.username} */}
        </>
      )}
      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{user.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{user.email}</p>
          <img
            className="profile-picture"
            src={user.profilePicture ? `${user.profilePicture}` : profile}
            alt="profileImg"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AboutInfo;
