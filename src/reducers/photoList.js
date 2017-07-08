export function photoListIsLoading(state = false, action) {
  switch (action.type) {
    case 'PHOTO_LIST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function photoList(state = [], action) {
  switch (action.type) {
    case 'PHOTO_LIST_RECEIVED':
      return action.photos;
    default:
      return state;
  }
}
