import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case "user/storyCreated":
      return {
        ...state,
        space: {
          ...state.space,
          stories: [...state.space.stories, action.payload],
        },
      };

    case "user/storiesDeleted": {
      console.log("id", action.payload);
      const id = action.payload;
      // make a new array which filters out the story that has been deleted
      // so if the story id is not the id of the deleted story, it will be filtered
      const newArrayOfStories = state.space.stories.filter(
        (story) => story.id !== id
      );
      console.log(newArrayOfStories);
      return {
        ...state,
        // return space (as it refers to user) and update the stories with the new array
        space: { ...state.space, stories: newArrayOfStories },
      };
    }

    default:
      return state;
  }
};
