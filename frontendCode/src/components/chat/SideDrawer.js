import React, { useState } from "react";
import { Offcanvas, Spinner, Dropdown, DropdownButton } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { useSelector } from "react-redux";
import AboutInfo from "./AboutInfo";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import "./sidedrawer.css";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import { ChatState } from "../chatContext/chatProvider";
import { getSender } from "./ChatLogics";
// import { ChatState } from "../chatContext/chatProvider";
const SideDrawer = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const {
    // user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const { user } = ChatState();
  // const { user } = useSelector((state) => state.authReducer.authData);
  const toast = useToast();
  const handleSearch = async () => {
    if (!search) {
      alert("Enter something in search");
      // toast({
      //   title: "Account created.",
      //   description: "We've created your account for you.",
      //   status: "success",
      //   duration: 9000,
      //   isClosable: true,
      // });
    }
    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/user/search?search=${search}`
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      alert("Failed to load the search Results");
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/chat/${user._id}`,
        { userId },
        config
      );
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]); //append the chat
      }
      setSelectedChat(data);
      // console.log(data);
      setLoadingChat(false);
      handleClose();
    } catch (error) {
      alert("error fetching the chat" + error);
    }
  };
  return (
    <>
      <div
        className="navmessages"
        style={{ backgroundColor: "white", padding: "0 1%" }}
      >
        <div>
          <div style={{ cursor: "pointer" }}>
            <i onClick={handleShow} className="uil uil-search"></i>
            <span onClick={handleShow}>Search User</span>
          </div>
        </div>
        <div style={{ fontSize: "2.5rem" }}>
          Fun<span style={{ color: "var(--color-primary)" }}>Zone</span>
        </div>
        <div className="col-sm-3">
          <DropdownButton
            id="dropdown-basic-button"
            variant="danger"
            className="custom-dropdown"
            title={
              <span>
                Messages
                <FaBell className="bell-icon" />
                <NotificationBadge
                  count={notification.length}
                  effect={Effect.SCALE}
                />
              </span>
            }
          >
            <Dropdown.Item>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <Dropdown.Item
                  key={notif._id}
                  onClick={() => {
                    console.log("on click");
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </Dropdown.Item>
              ))}
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="col-sm-1" style={{ color: "hsl(0deg 0% 76%)" }}>
          <AboutInfo user={user}>
            <i className="fa-solid fa-circle-info"></i>
            {/* {user.username} */}
          </AboutInfo>
        </div>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <input
            style={{ outline: "1px solid #666", padding: "0.25rem" }}
            placeholder="search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="searchDrawerbtn" onClick={handleSearch}>
            <i className="uil uil-search"></i>
          </button>
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <Spinner animation="border" />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideDrawer;
