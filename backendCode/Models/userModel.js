import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAdministrator: {
      type: Boolean,
      default: false,
    },
    isSupervisor: {
      type: Boolean,
      default: false,
    },
    notification: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },
    mystudents: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "active",
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

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
