export function selectSpaces(reduxState) {
  return reduxState.space.allSpaces;
}

export function selectStories(reduxState) {
  return reduxState.space.details;
}
