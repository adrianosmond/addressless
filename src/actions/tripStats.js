import { database } from '../lib/firebase';
import moment from 'moment';

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

function processStats (dataObj) {
  let returnObj = {
    keys: [],
    data: []
  }

  Object.keys(dataObj).forEach((dateStr) => {
    const date = moment(dateStr).toDate();
    const dateObj = dataObj[dateStr];

    Object.keys(dateObj).forEach((statKey) => {
      const val = dateObj[statKey]

      let keyPos = returnObj.keys.indexOf(statKey);
      if (keyPos < 0) {
        keyPos = returnObj.keys.push(statKey) - 1;
        returnObj.data[keyPos] = [];
      }

      returnObj.data[keyPos].push({
        val,
        date
      });
    });
  });

  return returnObj;
}

export function loadStats() {
  return (dispatch) => {
    dispatch(tripStatsAreLoading(true));

    database.ref("stats").once("value", (result) => {
      const data = processStats(result.val());
      dispatch(tripStats(data));
      dispatch(tripStatsAreLoading(false));
    });
  };
}
