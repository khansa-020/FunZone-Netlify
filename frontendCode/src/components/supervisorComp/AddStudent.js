import React, { useState, useEffect } from "react";
import "../right/rightSide.css";
// import FollowersCard from "../followerCards/FollowersCard";
import "../followerCards/followerCard.css";

// import { Followers } from '../../Data/FollowersData'
import User from "../user/User";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../api/UserRequest";
import Student from "./Student";

const AddStudent = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUsers();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  // ===== MESSAGES ====
  // searches chat
  const searchMessage = () => {
    const messages = document.querySelector(".messages");
    const message = messages.querySelectorAll(".message");
    const messageSearch = document.querySelector("#message-search");
    const val = messageSearch.value.toLowerCase();
    console.log(val);
    message.forEach((chat) => {
      let name = chat.querySelector(`span`).textContent.toLowerCase();
      if (name.indexOf(val) !== -1) {
        chat.style.display = "flex";
      } else {
        chat.style.display = "none";
      }
    });
  };
  // search chat
  // messageSearch.addEventListener('keyup', searchMessage);
  return (
    <div class="right">
      <div class="messages">
        <div class="heading">
          <h5>Add Students whom you are supervising</h5>
          <i class="uil uil-edit"></i>
        </div>
        {/* <!-- -----SEARCH BAR---- --> */}
        <div class="search-bar">
          <i class="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search Name..."
            id="message-search"
            onKeyUp={searchMessage}
          />
        </div>

        {/* <!-- -----Followers----- --> */}
        <div className="followerCard messages">
          {/* <h3>People you may know</h3> */}
          {persons.map((person, id) => {
            if (person._id !== user._id) {
              return <Student person={person} key={id} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
