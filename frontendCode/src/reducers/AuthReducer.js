import Auth from "../pages/Auth/Auth";
const authReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "SIGNUP_SUCCESS":
      return { success: true };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false };
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        success: true,
        error: false,
      };
    case "UPDAING_FAIL":
      return { ...state, updateLoading: false, error: true };
    case "DELETE_START":
      return { ...state, deleteLoading: true, error: false };
    case "DELETE_SUCCESS":
      localStorage.removeItem("store", JSON.stringify({ ...action?.data }));
      localStorage.removeItem("profile", JSON.stringify({ ...action?.data }));
      <Auth />;
      return {
        ...state,
        authData: action.data,
        deleteLoading: false,
        error: false,
      };
    case "DELETE_FAIL":
      return { ...state, deleteLoading: false, error: true };
    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };
    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };
    //   return {};
    default:
      return state;
  }
};
export default authReducer;
