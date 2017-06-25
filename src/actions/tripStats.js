import { database } from '../lib/firebase';

export function tripStatsAreLoading(bool) {
  return {
    type: 'TRIP_STATS_ARE_LOADING',
    isLoading: bool
  };
}

export function tripStats(stats) {
  return {
    type: 'TRIP_STATS_RECEIVED',
    stats
  };
}

export function loadStats() {
  return (dispatch) => {
    dispatch(tripStatsAreLoading(true));

    database.ref("stats").once("value", (result) => {
      const data = result.val();
      dispatch(tripStats(data));
      dispatch(tripStatsAreLoading(false));
    });
  };
}
