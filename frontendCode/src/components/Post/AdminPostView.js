import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./post.css";
import comment from "../../images/comment.png";
import share from "../../images/share.png";
import like from "../../images/like.png";
import unlike from "../../images/unlike.png";
import { likePost } from "../../api/PostRequest";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";

const AdminPostView = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  // const[liked, setLiked]=useState(data.likes.includes(user._id));
  // const[likes, setLikes]=useState(data.likes.length);

  let [liked, setLiked] = useState(data.likes.includes(user._id));
  let [likes, setLikes] = useState(data.likes.length);

  const [modal2Open, setModal2Open] = useState(false);
  const [recordId, setRecordId] = useState(null);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/post/deletepostbyadmin/${id}`,
        {
          data: {
            userId: user._id,
          },
        }
      );
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
  return (
    <>
      {data ? (
        <div className="post" style={{ margin: "2% 5% 0 5%" }}>
          {/* <img
            src={
              data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""
            }
            alt=""
          /> */}
          <img src={data.image ? `${data.image}` : ""} alt="" />
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
          </div>
          <div className="postReact">
            <i
              style={{
                fontSize: "2.3rem",
                marginTop: "1%",
                cursor: "pointer",
                color: "red",
              }}
              onClick={() => {
                setRecordId(data._id);
                setModal2Open(true);
              }}
              className="uil uil-trash-alt reactions"
            ></i>
          </div>

          {data.comments.map((record) => {
            return (
              <h6 style={{ color: "var(--color-gray)" }} key={record._id}>
                <strong style={{ color: "gray" }}>Commented By: </strong>
                {`${record.username}: `}
                {record.text}
              </h6>
            );
          })}

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
      ) : (
        <>No posts yet</>
      )}
    </>
  );
};

export default AdminPostView;
