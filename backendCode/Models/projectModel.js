import mongoose from "mongoose";
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      // only two options game development & digital arts
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unapproved",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    posterImg: String,
    file: String,
    video: String,
  },
  {
    timestamps: true,
  }
);
const ProjectModel = mongoose.model("Project", projectSchema);

export default ProjectModel;
