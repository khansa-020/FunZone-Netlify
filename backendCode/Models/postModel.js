import mongoose from "mongoose";
// const  ObjectId = mongoose.Types.ObjectId();
const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    posterBy: {
      type: String,
      // required: true
    },
    desc: String,
    comment: String,
    likes: [],
    comments: [
      {
        text: String,
        username: String,
      },
    ],
    image: String,
    video: String,
    filename: String,
  },
  {
    timestamps: true,
  }
);
const PostModel = mongoose.model("Posts", postSchema);
export default PostModel;
