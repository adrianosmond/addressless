export function postListIsLoading(state = false, action) {
  switch (action.type) {
    case 'POST_LIST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function postList(state = [], action) {
  switch (action.type) {
    case 'POST_LIST_RECEIVED':
      return action.posts;
    default:
      return state;
  }
}
