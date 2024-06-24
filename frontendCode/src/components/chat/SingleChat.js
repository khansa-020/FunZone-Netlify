import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatState } from "../chatContext/chatProvider";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import AboutInfo from "./AboutInfo";
import { getSender, getSenderFull } from "./ChatLogics";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import "./singleChat.css";
import io from "socket.io-client";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setnewMessage] = useState();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const [socketConnected, setSocketConnected] = useState(false);

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions = {
    // object
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/message/${selectedChat._id}/fetchMessages`
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      alert("Failed to Load the Messages!");
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        setnewMessage(""); // instantly got empty after enter
        const { data } = await axios.post(
          `http://localhost:5000/message/${user._id}`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        socket.emit("newmessage", data);
        setMessages([...messages, data]); // append the new messages
      } catch (error) {
        alert("Error occured!");
      }
    }
  };
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat; // either give notification or emit
  }, [selectedChat]); // whenever user switches to another chat => messages updates

  // updates everytime our app's state updates
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // give notification
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setnewMessage(e.target.value);

    if (!socketConnected) return;
    if (user._id !== selectedChat._id) {
      // only indicate to the opposite user
      if (!typing) {
        setTyping(true);
        socket.emit("typing", selectedChat._id);
      }
      let lastTypingTime = new Date().getTime();
      var timerLength = 1000;
      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
          socket.emit("stop typing", selectedChat._id);
          setTyping(false);
        }
      }, timerLength);
    }
  };

  return (
    <>
      {selectedChat ? (
        <>
          <AiOutlineDoubleLeft
            onClick={() => setSelectedChat("")}
          ></AiOutlineDoubleLeft>
          {!selectedChat.isGroupChat ? (
            <>
              {getSender(user, selectedChat.users)}
              <AboutInfo user={getSenderFull(user, selectedChat.users)} />
            </>
          ) : (
            <>
              {selectedChat.chatName.toUpperCase()}
              <UpdateGroupChatModal
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                fetchMessages={fetchMessages}
              />
            </>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "3px",
              backgroundColor: "rgb(255 249 248)",
              width: "100%",
              height: "86vh",
              borderRadius: "2rem",
              overflowY: "hidden",
              marginTop: "1.5%",
            }}
          >
            {/* Messages here */}
            {loading ? (
              <Spinner
                animation="border"
                style={{ alignSelf: "center", margin: "auto" }}
              />
            ) : (
              <div className="messages">
                {/* Messages */}
                <ScrollableChat messages={messages} />
              </div>
            )}
            {isTyping ? (
              <div>
                {/* Typing... */}
                <Lottie
                  options={defaultOptions}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              </div>
            ) : (
              <></>
            )}
            <input
              type="text"
              placeholder="Message..."
              className="form-control"
              onKeyDown={sendMessage}
              onChange={typingHandler}
              required
              value={newMessage || ""}
              style={{
                padding: "1.5rem",
                backgroundColor: "rgb(243 225 225)",
                border: "1px solid pink",
                borderRadius: "1.25rem",
              }}
            />
          </div>{" "}
          {/* end chatbox gray box */}
        </>
      ) : (
        <div>
          <p style={{ fontWeight: "600" }}>Click on a user to start a chat!</p>
        </div>
      )}
    </>
  );
};

export default SingleChat;
