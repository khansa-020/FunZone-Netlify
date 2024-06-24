import {
  NOTE_CREATE_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_DELETE_FAIL,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_LIST_FAIL,
  NOTE_LIST_REQUEST,
  NOTE_LIST_SUCCESS,
  NOTE_UPDATE_FAIL,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
} from "../constants/notesConstants";

export const notListReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case NOTE_LIST_REQUEST:
      return { loading: true };
    case NOTE_LIST_SUCCESS:
      return { loading: false, notes: action.payload };
    case NOTE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case NOTE_CREATE_REQUEST:
      state = {};
      return { loading: true };
    case NOTE_CREATE_SUCCESS:
      state = {};
      return { loading: false, success: true };
    case NOTE_CREATE_FAIL:
      state = {};
      return { loading: false, error: action.payload };
    case NOTE_UPDATE_REQUEST:
      state = {};
      return { loading: true };
    case NOTE_UPDATE_SUCCESS:
      state = {};
      return { loading: false, success: true };
    case NOTE_UPDATE_FAIL:
      state = {};
      return { loading: false, error: action.payload, success: false };
    case NOTE_DELETE_REQUEST:
      state = {};
      return { loading: true };
    case NOTE_DELETE_SUCCESS:
      state = {};
      return { loading: false, success: true };
    case NOTE_DELETE_FAIL:
      state = {};
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

// export const noteCreatetReducer = (state = {}, action) => {
//   switch (action.type) {
//     case NOTE_CREATE_REQUEST:
//       return { loading: true };
//     case NOTE_CREATE_SUCCESS:
//       return { loading: false, success: true };
//     case NOTE_CREATE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export default notListReducer;
