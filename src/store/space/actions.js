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
    // console.log(response.data);

    dispatch(spacesFetched(response.data));
  } catch (e) {
    console.log(e);
  }
};
