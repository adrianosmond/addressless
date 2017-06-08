import { combineReducers } from 'redux';
import { latestPhotosAreLoading, latestPhotos } from './latestPhotos';

export default combineReducers({
  latestPhotosAreLoading,
  latestPhotos
});
