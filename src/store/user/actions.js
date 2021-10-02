import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const storiesDeleted = (data) => {
  return {
    type: "user/storiesDeleted",
    payload: data,
  };
};

export const deleteStory = (id) => async (dispatch, getState) => {
  try {
    // checking which id we have
    console.log(id);
    const response = await axios.delete(`http://localhost:4000/myspace/${id}`);
    console.log(response);

    dispatch(storiesDeleted(id));
  } catch (e) {
    console.log(e);
  }
};

export const storyCreated = (data) => {
  return {
    type: "user/storyCreated",
    payload: data,
  };
};

export const createStory = (data) => async (dispatch, getState) => {
  try {
    const reduxstate = getState();
    const token = reduxstate.user.token;
    const response = await axios.post(
      `http://localhost:4000/myspace`,
      {
        name: data.name,
        content: data.content,
        imageUrl: data.imageUrl,
        spaceId: data.spaceId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    dispatch(storyCreated(response.data));
    dispatch(
      showMessageWithTimeout("success", false, "successfully posted!", 3500)
    );
  } catch (e) {
    console.log(e);
  }
};

export const spaceUpdated = (data) => {
  return {
    type: "user/spaceUpdated",
    payload: data,
  };
};

export const updateSpace = (data) => async (dispatch, getState) => {
  try {
    const reduxstate = getState();
    const token = reduxstate.user.token;
    const spaceId = reduxstate.user.space.id;
    const response = await axios.patch(
      `http://localhost:4000/myspace`,
      {
        title: data.tile,
        description: data.description,
        backgroundColor: data.backgroundColor,
        color: data.color,
        spaceId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    dispatch(spaceUpdated(response.data));
    dispatch(
      showMessageWithTimeout("success", false, "successfully edited!", 3500)
    );
  } catch (e) {
    console.log(e);
  }
};
