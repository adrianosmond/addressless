import { combineReducers } from 'redux';
import { latestPhotosAreLoading, latestPhotos } from './latestPhotos';
import { latestPostIsLoading, latestPost } from './latestPost';
import { tripStatsAreLoading, tripStats } from './tripStats';

export default combineReducers({
  latestPhotosAreLoading,
  latestPhotos,
  latestPostIsLoading,
  latestPost,
  tripStatsAreLoading,
  tripStats
});
