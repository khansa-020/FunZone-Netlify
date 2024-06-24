import React from "react";
import profile from "../../images/defaultProfile.png";
import { Card, Button } from "react-bootstrap";
const UserListItem = ({ user, handleFunction }) => {
  // const {user} = ChatState();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Card style={{ width: "100%" }} onClick={handleFunction}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body
          style={{
            display: "flex",
            alignItems: "baseline",
            backgroundColor: "var(--color-primary)",
          }}
          className="text-white"
        >
          <img
            style={{
              borderRadius: "50%",
              width: "2.5rem",
              height: "2.5rem",
              marginTop: "1%",
            }}
            src={user.profilePicture ? `${user.profilePicture}` : profile}
            alt="profileImg"
          />
          <Card.Title style={{ margin: "3%" }}> {user.username} </Card.Title>
          <Card.Text> {user.email}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserListItem;
