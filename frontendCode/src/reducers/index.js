import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import noteReducer from "./NoteReducer";
export const reducers = combineReducers({
  authReducer,
  postReducer,
  noteReducer,
});
