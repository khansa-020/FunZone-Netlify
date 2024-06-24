import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatState } from "../chatContext/chatProvider";
import ChatLoading from "./ChatLoading";
import { Card } from "react-bootstrap";
import { getSender } from "./ChatLogics";
import GroupChatModal from "./GroupChatModal";
import "./myChats.css";
const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const { user } = useSelector((state) => state.authReducer.authData);
  const fetchChats = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/chat/${user._id}`
      );
      setChats(data);
    } catch (error) {
      alert("failed to load chats");
    }
  };
  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, [fetchAgain]);
  //  whenever chat changes it gonna update it
  return (
    <>
      <div
        style={{
          display: selectedChat ? "block" : "d-flex",
          backgroundColor: "rgb(255 249 248)",
          color: "var(--color-secondary)",
          height: "88vh",
          overflowY: "scroll",
          marginTop: " 4%",
        }}
        className="container myChatsCol"
      >
        <div
          className="d-flex"
          style={{ justifyContent: "space-between", marginTop: "2%" }}
        >
          <strong>My Chats</strong>
          <GroupChatModal>
            <button type="button" className="btn btn-primary">
              New Room Chat<i className="fa-solid fa-plus"></i>
            </button>
          </GroupChatModal>
        </div>
        <div>
          {chats ? (
            <div>
              {chats.map((chat) => (
                <Card
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "secondary" : "#fff"}
                  text={selectedChat === chat ? "white" : "secondary"}
                  px={3}
                  py={2}
                  // borderRadius="lg"
                  key={chat._id}
                >
                  <Card.Body>
                    {/* <Card.Title>{user.name}</Card.Title> */}
                    <Card.Text>
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <ChatLoading />
          )}
        </div>
      </div>
    </>
  );
};

export default MyChats;
