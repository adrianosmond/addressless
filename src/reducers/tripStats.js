export function tripStatsAreLoading(state = false, action) {
  switch (action.type) {
    case 'TRIP_STATS_ARE_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function tripStats(state = {}, action) {
  switch (action.type) {
    case 'TRIP_STATS_RECEIVED':
      return action.stats;
    default:
      return state;
  }
}
