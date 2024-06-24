import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getTimeLinePosts,
  LikePost,
  updatePost,
  CommentPost,
  deletePostByAdmin,
} from "../Controllers/PostController.js";
const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.delete("/deletepostbyadmin/:id", deletePostByAdmin);
router.put("/:id/like", LikePost);
router.put("/:id/comment", CommentPost);
router.get("/:id/timeline", getTimeLinePosts);
export default router;
