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
  let processedObj = {
    keys: [],
    data: [],
    timeExtent: [undefined, undefined]
  }

  const dateKeys = Object.keys(dataObj);

  dateKeys.forEach((dateStr, idx) => {
    const date = moment(dateStr).toDate();
    if (idx === 0) {
      processedObj.timeExtent[0] = date;
    }
    if (idx === dateKeys.length - 1) {
      processedObj.timeExtent[1] = date;
    }
    const dateObj = dataObj[dateStr];

    Object.keys(dateObj).forEach((statKey) => {
      const val = dateObj[statKey]

      let keyPos = processedObj.keys.indexOf(statKey);
      if (keyPos < 0) {
        keyPos = processedObj.keys.push(statKey) - 1;
        processedObj.data[keyPos] = [];
      }

      processedObj.data[keyPos].push({
        val,
        date
      });
    });
  });

  return processedObj;
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
