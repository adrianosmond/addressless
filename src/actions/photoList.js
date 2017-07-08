import { database } from '../lib/firebase';

export function photoListIsLoading(bool) {
  return {
    type: 'PHOTO_LIST_IS_LOADING',
    isLoading: bool
  };
}

export function photoList(photos) {
  return {
    type: 'PHOTO_LIST_RECEIVED',
    photos
  };
}

export function loadPhotoList() {
  return (dispatch) => {
    dispatch(photoListIsLoading(true));

    database.ref("photos").once("value", (result) => {
      dispatch(photoList(result.val()));
      dispatch(photoListIsLoading(false));
    });
  };
}
