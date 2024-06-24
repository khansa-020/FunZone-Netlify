import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

// Create new Post

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a post

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action Forbidden!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// Delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      // res.status(200).json("Post Deleted!");
      res.status(200).send({
        success: true,
        message: "Post deleted successfully!",
        //   project: deletedProject,
      });
    } else {
      res.status(403).json("Action Forbidden!");
      console.log("usr", userId);
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting post!",
      //   project: deletedProject,
    });
  }
};
// Delete a post
export const deletePostByAdmin = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);

    await post.deleteOne();

    res.status(200).send({
      success: true,
      message: "Post deleted successfully!",
      //   project: deletedProject,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting post!",
      //   project: deletedProject,
    });
  }
};

// Like/ dislike a post
export const LikePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post DisLiked!");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// comment a post
export const CommentPost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  const { username } = req.body;
  const comment = { text: req.body.text, userId, username };
  try {
    const post = await PostModel.findById(id);

    await post.updateOne({ $push: { comments: comment } });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Timeline posts

export const getTimeLinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
