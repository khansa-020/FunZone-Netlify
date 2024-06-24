import React, { useEffect, useRef, useState } from "react";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { getUser } from "../../api/UserRequest";
import profile from "../../images/defaultProfile.png";
import "../chatBox/chatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
const ChatBox = ({ chat, currentUserId, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef();
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUserId);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="follower conversation">
              <div className="menu-item">
                <div className="profile-picture">
                  <img
                    className="profile-picture"
                    src={
                      userData.profilePicture
                        ? `${userData.profilePicture}`
                        : profile
                    }
                    alt="profileImg"
                  />
                </div>
                <div className="name">
                  <h3>{userData?.username}</h3>
                </div>
              </div>
            </div>
            {/* chatbox messages */}
            {/* chat-body */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUserId
                        ? "chatMessage own"
                        : "chatMessage"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div onClick={handleSend} className="send-button buttn">
                send
              </div>
            </div>
          </>
        ) : (
          <span>Tap on a chat to start conversation!</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
