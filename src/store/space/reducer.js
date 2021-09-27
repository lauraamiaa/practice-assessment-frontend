const initialState = {
  loading: false,
  allSpaces: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "space/spacesFetched": {
      console.log("action", action.payload);
      return {
        loading: false,
        allSpaces: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
}
