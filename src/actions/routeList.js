import { database } from '../lib/firebase';

export function routeListIsLoading(bool) {
  return {
    type: 'ROUTE_LIST_IS_LOADING',
    isLoading: bool
  };
}

export function routeList(routes) {
  return {
    type: 'ROUTE_LIST_RECEIVED',
    routes
  };
}

export function loadRouteList() {
  return (dispatch) => {
    dispatch(routeListIsLoading(true));

    database.ref("routes").once("value", (result) => {
      dispatch(routeList(result.val()));
      dispatch(routeListIsLoading(false));
    });
  };
}
