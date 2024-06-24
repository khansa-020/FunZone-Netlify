import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import profile from "../../images/defaultProfile.png";
import { Tooltip } from "react-bootstrap";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./ChatLogics";
import { format } from "timeago.js";
const ScrollableChat = ({ messages }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((currentMessage, index) => (
          <div
            style={{
              display: "flex",
              marginRight: "1%",
              marginBottom: "0.85px",
            }}
            key={currentMessage._id}
          >
            {(isSameSender(messages, currentMessage, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
              // <Tooltip label={currentMessage.sender.username}
              // placement="bottom-start"
              // >

              <>
                <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                  {currentMessage.sender.username}
                </Tooltip>
                <img
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    width: "2.5rem",
                    height: "2.5rem",
                    marginTop: "-8rem",
                    marginLeft: "0.5%",
                  }}
                  src={user.profilePicture ? `${user.profilePicture}` : profile}
                  alt="profileImg"
                />

                {/* <p>{currentMessage.sender.username}</p> */}
              </>
              // </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  currentMessage.sender._id === user._id
                    ? "var(--color-primary)"
                    : "#ffe5e5"
                }`,
                color: `${
                  currentMessage.sender._id === user._id ? "white" : "#666"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(
                  messages,
                  currentMessage,
                  index,
                  user._id
                ),

                marginTop: isSameUser(messages, currentMessage, index, user._id)
                  ? 3
                  : 10,
              }}
            >
              {currentMessage.content}
              <br />
              <span
                style={{
                  color: `${
                    currentMessage.sender._id === user._id ? "#e8e8e8" : "#666"
                  }`,
                  fontSize: "0.95rem",
                }}
              >
                {format(currentMessage.createdAt)}
              </span>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
