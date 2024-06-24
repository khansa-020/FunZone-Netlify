import mongoose from "mongoose";
// const  ObjectId = mongoose.Types.ObjectId();
const FileSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    posterBy: {
      type: String,
      // required: true
    },

    filename: String,
  },
  {
    timestamps: true,
  }
);
const FileModel = mongoose.model("Files", FileSchema);
export default FileModel;
