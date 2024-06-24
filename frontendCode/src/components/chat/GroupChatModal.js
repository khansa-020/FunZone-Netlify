import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ChatState } from "../chatContext/chatProvider";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";

const GroupChatModal = ({ children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { chats, setChats } = ChatState();
  const { user } = useSelector((state) => state.authReducer.authData);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupChatName || !selectedUsers) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const { data } = await axios.post(
        ` http://localhost:5000/chat/${user._id}/room`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        }
      );
      setChats([data, ...chats]);
      handleClose();
      alert("New Room Chat created!");
    } catch (error) {
      alert("Failed to Create a Room Chat!" + error);
    }
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      alert("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  return (
    <>
      <span onClick={handleShow}>{children}</span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Room Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicChatName">
              <Form.Control
                type="text"
                placeholder="Chat Name"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSearch">
              <Form.Control
                type="text"
                placeholder="Add Users"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Form.Group>
            {/* selected users */}
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={user._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
            {/* render searched users */}
            {loading ? (
              <div>loading</div>
            ) : (
              //   map top 4 search results
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Create Room
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GroupChatModal;
