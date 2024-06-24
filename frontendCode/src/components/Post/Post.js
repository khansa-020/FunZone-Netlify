import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./post.css";

import like from "../../images/like.png";
import unlike from "../../images/unlike.png";
import { likePost } from "../../api/PostRequest";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  // const[liked, setLiked]=useState(data.likes.includes(user._id));
  // const[likes, setLikes]=useState(data.likes.length);

  let [liked, setLiked] = useState(data.likes.includes(user._id));
  let [likes, setLikes] = useState(data.likes.length);

  const [modal2Open, setModal2Open] = useState(false);
  const [recordId, setRecordId] = useState(null);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  const makeComment = (text, userId, username) => {
    fetch(`http://localhost:5000/post/${data._id}/comment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        text,
        username,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/post/${id}`, {
        data: {
          userId: user._id,
        },
      });
      if (response.data.success) {
        message.success(response.data.message);
      }
      window.location.reload();
      // Filter out the deleted user from the users array
      // const updatedPostsList = data.filter((post) => post._id !== id);
      // Update the users state with the filtered array
      // setAppointments(updatedPostsList);
    } catch (error) {
      console.error(error);

      message.error("Error deleting post!");
    }
  };
  const handleClick = (id) => {
    handleDelete(id);
    setModal2Open(false);
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      // timeZone: "UTC",
      // timeZoneName: "short",
    };
    return date.toLocaleString("en-US", options);
  }
  const formattedDate = formatDate(data.createdAt);
  return (
    <>
      <div className="post">
        {/* <img
          src={
            data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""
          }
          alt=""
        /> */}
        {data.image && <img src={`${data.image}`} alt="Post" />}
        {data.video ? (
          <video className="PostVideo" controls>
            <source src={`${data.video}`} type="video/mp4" />
          </video>
        ) : (
          ""
        )}
        <div className="detail">
          <span>
            <strong style={{ color: "gray" }}>Posted By: </strong>
            <b>{data.posterBy}</b>
          </span>
          <span> {data.desc}</span>
          <p>{formattedDate}</p>
        </div>
        <div className="postReact">
          <img
            className="reactions"
            src={liked ? like : unlike}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />

          {/* <img className="reactions" src={share} alt="" /> */}
          {/* <button onClick={() => handleDelete(data._id)}>delete</button> */}
          {data.userId === user._id && ( //only delete own post(s)
            <i
              style={{
                fontSize: "2.3rem",
                marginTop: "-1%",
                cursor: "pointer",
                color: "red",
              }}
              onClick={() => {
                setRecordId(data._id);
                setModal2Open(true);
              }}
              className="uil uil-trash-alt reactions"
            ></i>
          )}
        </div>
        <span style={{ color: "var(--color-primary)", fontSize: "12px" }}>
          {likes} Likes
        </span>

        <strong style={{ color: "gray" }}>Comments: </strong>
        {data.comments.map((record) => {
          return (
            <h6
              style={{ color: "var(--color-dark)", fontSize: "14px" }}
              key={record._id}
            >
              {/* <span style={{ fontWeight: "500" }}>{record.postedBy.name}</span>{" "} */}
              <strong> {`${record.username}: `}</strong>
              {record.text}
            </h6>
          );
        })}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            makeComment(e.target[0].value, user._id, user.username);
            window.location.reload();
          }}
        >
          <input
            style={{ background: "transparent" }}
            type="text"
            placeholder="Type a comment..."
          />
        </form>

        <Modal
          title="Confirmation"
          okText="Delete"
          okType="danger"
          centered
          open={modal2Open}
          onOk={() => handleClick(recordId)}
          onCancel={() => {
            setModal2Open(false);
            setRecordId(null);
          }}
        >
          <p>Are you sure, you want to delete this Post permanently?</p>
        </Modal>
      </div>
    </>
  );
};

export default Post;
