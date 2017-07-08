import { combineReducers } from 'redux';
import { latestPhotosAreLoading, latestPhotos } from './latestPhotos';
import { latestPostIsLoading, latestPost } from './latestPost';
import { tripStatsAreLoading, tripStats } from './tripStats';
import { photoListIsLoading, photoList } from './photoList';
import { postListIsLoading, postList } from './postList';

export default combineReducers({
  latestPhotosAreLoading,
  latestPhotos,
  latestPostIsLoading,
  latestPost,
  tripStatsAreLoading,
  tripStats,
  photoListIsLoading,
  photoList,
  postListIsLoading,
  postList
});
