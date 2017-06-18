export function latestPostIsLoading(state = false, action) {
  switch (action.type) {
    case 'LATEST_POST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function latestPost(state = [], action) {
  switch (action.type) {
    case 'LATEST_POST_RECEIVED':
      return action.post;
    default:
      return state;
  }
}
