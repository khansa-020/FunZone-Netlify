import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChatBox from "../../components/chat/ChatBox";
import MyChats from "../../components/chat/MyChats";
import SideDrawer from "../../components/chat/SideDrawer";
import "./chatpage.css";
// import { ChatState } from "../../components/chatContext/chatProvider";

const ChatPage = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  // const { selectedChat } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <>
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <div className="chatContainer">
          <div>{user && <MyChats fetchAgain={fetchAgain} />}</div>
          <div>
            {user && (
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default ChatPage;
