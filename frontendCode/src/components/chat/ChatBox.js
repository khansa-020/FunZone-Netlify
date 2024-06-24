import React from "react";
import { ChatState } from "../chatContext/chatProvider";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <>
      <div
        className="container"
        // style={{ display: selectedChat ? "flex" : "none" }}
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </div>
    </>
  );
};

export default ChatBox;
