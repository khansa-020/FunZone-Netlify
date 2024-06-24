import mongoose from "mongoose";

const SupervisorSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    notification: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      // required: [true, "Work timing is required"],
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksAt: String,
    workStatus: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

const SupervisorModel = mongoose.model("Supervisors", SupervisorSchema);
export default SupervisorModel;
