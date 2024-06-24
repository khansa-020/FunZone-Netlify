import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import profile from "../../images/defaultProfile.png";

const Student = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [add, setAdd] = useState(false);
  //   const [add, setAdd] = useState(
  //     false
  // person.followers.includes(user._id)
  //   );
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${user._id}`
        );
        const userData = response.data;
        setAdd(userData.mystudents.includes(person._id));
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUser();
  }, [user._id, person._id]);
  const handleAdd = async () => {
    try {
      await axios.put(`http://localhost:5000/user/${user._id}/addstudent`, {
        studentId: person._id,
      });
      setAdd(true);
      window.location.reload(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleRemove = async () => {
    try {
      await axios.put(`http://localhost:5000/user/${user._id}/removestudent`, {
        studentId: person._id,
      });
      setAdd(false);
      window.location.reload(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <div className="follower message">
        <div>
          <img
            src={user.profilePicture ? `${user.profilePicture}` : profile}
            alt="profileImg"
            className="followerImg"
          />
          <div className="name">
            <span>{person.username}</span>
            <span>{person.email}</span>
          </div>
        </div>
        <button
          className={add ? "butn fc-butn Unfollowbutn" : "butn fc-butn"}
          onClick={add ? handleRemove : handleAdd}
        >
          {add ? "Remove" : "Add"}
        </button>
      </div>
    </>
  );
};

export default Student;
