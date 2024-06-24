import React from "react";
import "../middle/middleside.css";

import PostShare from "../PostShare/PostShare";
import Posts from "../Posts/Posts";

const MiddleSideSup = () => {
  return (
    <div className="middle">
      <PostShare />
      <Posts />
    </div>
  );
};

export default MiddleSideSup;
