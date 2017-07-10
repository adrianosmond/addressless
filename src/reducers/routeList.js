export function routeListIsLoading(state = false, action) {
  switch (action.type) {
    case 'ROUTE_LIST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function routeList(state = [], action) {
  switch (action.type) {
    case 'ROUTE_LIST_RECEIVED':
      return action.routes;
    default:
      return state;
  }
}
