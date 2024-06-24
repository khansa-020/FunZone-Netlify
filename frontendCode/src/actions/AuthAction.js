import * as AuthApi from "../api/AuthRequest";
import { message } from "antd";
export const LogIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.LogIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    message.success("Logged in Successfully");
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 403) {
      message.error("Your account is currently deactivated by admin");
    } else {
      message.error("Invalid Credentials");
    }

    dispatch({ type: "AUTH_FAIL" });
  }
};

export const SignUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.SignUp(formData);
    dispatch({ type: "SIGNUP_SUCCESS", data: data });
    message.success(
      "Verification sent to your email address. Please verify to register!"
    );
  } catch (error) {
    dispatch({ type: "AUTH_FAIL" });
    if (error.response && error.response.data && error.response.data.message) {
      message.error(error.response.data.message);
    } else {
      message.error("An error occurred during registration.");
    }
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
