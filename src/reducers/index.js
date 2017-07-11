import { combineReducers } from 'redux';
import { photoListIsLoading, photoList } from './photoList';
import { routeListIsLoading, routeList } from './routeList';
import { postListIsLoading, postList } from './postList';

export default combineReducers({
  photoListIsLoading,
  photoList,
  postListIsLoading,
  postList,
  routeListIsLoading,
  routeList
});
