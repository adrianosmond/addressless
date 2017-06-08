import { database } from '../lib/firebase';

export function latestPhotosAreLoading(bool) {
  return {
    type: 'LATEST_PHOTOS_ARE_LOADING',
    isLoading: bool
  };
}

export function latestPhotos(photos) {
  return {
    type: 'LATEST_PHOTOS_RECEIVED',
    photos
  };
}

export function loadLatestPhotos() {
  return (dispatch) => {
    dispatch(latestPhotosAreLoading(true));

    database.ref("photos").limitToLast(3).once("value", (result) => {
      dispatch(latestPhotos(result.val()));
      dispatch(latestPhotosAreLoading(false));
    });
  };
}
