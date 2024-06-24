import React from "react";
import { Badge, CloseButton } from "react-bootstrap";
const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <>
      <Badge
        className="bg-success p-2 text-dark bg-opacity-25"
        onClick={handleFunction}
        style={{ marginRight: "2%" }}
      >
        {user.username}
        <CloseButton />
      </Badge>
    </>
  );
};

export default UserBadgeItem;
