import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import profile from "../../images/defaultProfile.png";
import ChatBox from "../chatBox/ChatBox";
import Conversation from "../conversation/Conversation";
import "../left/leftSide.css";
import { io } from "socket.io-client";
const LeftChat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const { user } = useSelector((state) => state.authReducer.authData);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();
  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <div className="left">
        <a className="profileBox">
          <div className="profile-picture">
            <img
              src={user.profilePicture ? `${user.profilePicture}` : profile}
              alt="profileImg"
            />
          </div>
          <div className="handle">
            <h4>{user.username}</h4>
            <p className="text-muted">{user.email}</p>
          </div>
        </a>
        {/* <!-- ----SIDEBAR---- --> */}
        <div className="sidebar">
          {chats.map((chat) => (
            <div onClick={() => setCurrentChat(chat)}>
              <Conversation
                data={chat}
                currentUserId={user._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))}
          <a className="menu-item" to="/">
            <span>
              <i className="uil uil-home"></i>
            </span>
            <h3>Home</h3>
          </a>
          <a className="menu-item" to={`/profile/${user._id}`}>
            <span>
              <i className="uil uil-user-circle"></i>
            </span>
            <h3>Profile</h3>
          </a>
          <a className="menu-item" to={`/tasks/${user._id}`}>
            <span>
              <i className="uil uil-table"></i>
            </span>
            <h3>Taskboard</h3>
          </a>
          <a className="menu-item" to={`/uploads/${user._id}`}>
            <span>
              <i className="uil uil-upload"></i>
            </span>
            <h3>Upload</h3>
          </a>

          {/* <!-- <a className="menu-item">
        <span><i className="uil uil-signal-alt-3"></i></span><h3>Reports</h3>
    </a> --> */}
        </div>
        {/* <!-- ----END OF SIDEBAR---- --> */}
        <a className="butn butn-primary" htmlFor="create-post">
          Create Post
        </a>
      </div>
      <div className="middle">
        <ChatBox
          chat={currentChat}
          currentUserId={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </>
  );
};

export default LeftChat;
