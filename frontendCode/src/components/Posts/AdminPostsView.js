import React, { useEffect } from "react";
import "./posts.css";
// import { PostsData } from '../../Data/PostsData';
import { useDispatch, useSelector } from "react-redux";
import { getTimeLinePosts } from "../../actions/PostAction";
import { useParams } from "react-router-dom";
import AdminPostView from "../Post/AdminPostView";
const AdminPostsView = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();
  useEffect(() => {
    dispatch(getTimeLinePosts(params.id));
  }, []);
  if (!posts) return "No post yet!";

  return (
    <div className="posts">
      {loading
        ? "Fetching Posts..."
        : posts.map((post, id) => {
            return <AdminPostView data={post} key={id} />;
          })}
    </div>
  );
};

export default AdminPostsView;
