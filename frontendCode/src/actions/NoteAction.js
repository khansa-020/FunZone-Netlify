import axios from "axios";
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

export const listNotes = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTE_LIST_REQUEST,
    });
    // const {
    //   userLogin: { profile },
    // } = getState();

    const { data } = await axios.get(`http://localhost:5000/notes/${id}`);
    dispatch({
      type: NOTE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTE_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNote =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTE_CREATE_REQUEST,
      });
      // const {
      //   userLogin: { profile },
      // } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/notes/${id}/create`,
        { title, content, category },
        config
      );
      dispatch({
        type: NOTE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTE_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateNote =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTE_UPDATE_REQUEST,
      });
      // const {
      //   userLogin: { profile },
      // } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/notes/${id}/specificnote`,
        { title, content, category },
        config
      );
      dispatch({
        type: NOTE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTE_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteNote = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTE_DELETE_REQUEST,
    });
    // const {
    //   userLogin: { profile },
    // } = getState();

    const { data } = await axios.delete(
      `http://localhost:5000/notes/${id}/specificnote`
    );
    dispatch({
      type: NOTE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTE_DELETE_FAIL,
      payload: message,
    });
  }
};
