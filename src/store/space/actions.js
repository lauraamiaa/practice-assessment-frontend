import axios from "axios";

export const spacesFetched = (data) => {
  return {
    type: "space/spacesFetched",
    payload: data,
  };
};

export const fetchSpaces = () => async (dispatch, getState) => {
  try {
    const response = await axios.get("http://localhost:4000/spaces");

    dispatch(spacesFetched(response.data));
  } catch (e) {
    console.log(e);
  }
};

export const storiesFetched = (data) => {
  return {
    type: "space/storiesFetched",
    payload: data,
  };
};

export const fetchStories = (space) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/stories/${space.id}`
    );
    dispatch(storiesFetched(response.data));
  } catch (e) {
    console.log(e);
  }
};
