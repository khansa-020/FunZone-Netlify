import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./Meetingfeatures/alertSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
  },
});
