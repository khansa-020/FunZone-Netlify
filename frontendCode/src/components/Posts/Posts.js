import React, { useEffect } from "react";
import "./posts.css";
// import { PostsData } from '../../Data/PostsData';
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import { getTimeLinePosts } from "../../actions/PostAction";
import { useParams } from "react-router-dom";
const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();
  useEffect(() => {
    dispatch(getTimeLinePosts(user._id));
  }, []);
  if (!posts) return "No post yet!";
  if (params.id) posts = posts.filter((post) => post.userId === params.id); // if it is a profile page we then only render person's own posts not the posts of those he follows
  return (
    <div className="posts">
      {loading
        ? "Fetching Posts..."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
