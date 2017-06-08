export function latestPhotosAreLoading(state = false, action) {
  switch (action.type) {
    case 'LATEST_PHOTOS_ARE_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function latestPhotos(state = [], action) {
  switch (action.type) {
    case 'LATEST_PHOTOS_RECEIVED':
      return action.photos;
    default:
      return state;
  }
}
