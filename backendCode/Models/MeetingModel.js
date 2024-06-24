import mongoose from "mongoose";

const MeetingSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    supervisorId: {
      type: String,
      required: true,
    },
    supervisorInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MeetingModel = mongoose.model("meetings", MeetingSchema);
export default MeetingModel;
