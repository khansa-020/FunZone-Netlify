import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ChatState } from "../chatContext/chatProvider";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";
import { Spinner } from "react-bootstrap";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { selectedChat, setSelectedChat } = ChatState();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState();

  const handleRemove = async (user1) => {
    //user logged is not equal to one who trying to remove
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      alert("Only Admin can remove someone!");
      return;
    }
    try {
      setLoading(true);

      const { data } = await axios.put(
        "http://localhost:5000/chat/removefromroom",
        {
          chatId: selectedChat._id,
          userId: user1._id,
          // user is the logged person and user1 is one whom we want to add
        }
      );
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages(); // refresh messages
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };
  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      alert("User Already in group!");
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      alert("Only Admin can add someone!");
    }
    try {
      setLoading(true);
      const { data } = await axios.put("http://localhost:5000/chat/addtoroom", {
        chatId: selectedChat._id,
        userId: user1._id,
        // user is the logged person and user1 is one whom we want to add
      });
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      alert("Error occured!");
    }
  };
  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }
    try {
      setRenameLoading(true);

      const { data } = await axios.put("http://localhost:5000/chat/rename", {
        chatId: selectedChat._id,
        chatName: groupChatName,
      });
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      alert("Error occured");
      setRenameLoading(false);
    }
    setGroupChatName("");
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/user/search?search=${search}`
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      alert("Failed to load the search results");
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}> */}
      <AiOutlineUsergroupAdd
        style={{ cursor: "pointer", marginLeft: "5%", fontSize: "2rem" }}
        onClick={handleShow}
      />
      {/* </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedChat.chatName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              paddingBottom: "3px",
            }}
          >
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={user._id}
                user={u}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </div>
          <div className="d-flex">
            <input
              className="form-control"
              placeholder="Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button
              variant="success"
              onClick={handleRename}
              isLoading={renameLoading}
            >
              Rename
            </Button>
          </div>
          <input
            className="form-control"
            placeholder="Add User to a group"
            onChange={(e) => handleSearch(e.target.value)}
          />
          {loading ? (
            <Spinner animation="border" />
          ) : (
            //   map top 4 search results
            searchResult
              ?.slice(0, 2)
              .map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="danger" onClick={() => handleRemove(user)}>
            Leave Group
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
