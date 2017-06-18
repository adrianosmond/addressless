import { combineReducers } from 'redux';
import { latestPhotosAreLoading, latestPhotos } from './latestPhotos';
import { latestPostIsLoading, latestPost } from './latestPost';

export default combineReducers({
  latestPhotosAreLoading,
  latestPhotos,
  latestPostIsLoading,
  latestPost
});
