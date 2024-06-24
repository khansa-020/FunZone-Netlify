import React from "react";
import LeftChat from "../../components/leftChat/LeftChat";
import RightChat from "../../components/rightChat/RightChat";

import "../chats/chat.css";
const Chat = () => {
  return (
      <main>
    <div className="Container">
       <LeftChat/>
       <RightChat/>
    </div>
    </main>
  );
};

export default Chat;
