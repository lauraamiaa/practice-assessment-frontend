const initialState = {
  loading: true,
  allSpaces: [],
  details: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "space/spacesFetched": {
      // console.log("action homepage", action.payload);
      return {
        loading: false,
        allSpaces: [...action.payload],
      };
    }
    case "space/storiesFetched": {
      // console.log("action details", action.payload);
      return {
        ...state,
        details: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
