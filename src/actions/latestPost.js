import { database } from '../lib/firebase';

export function latestPostIsLoading(bool) {
  return {
    type: 'LATEST_POST_IS_LOADING',
    isLoading: bool
  };
}

export function latestPost(post) {
  return {
    type: 'LATEST_POST_RECEIVED',
    post
  };
}

export function loadLatestPost() {
  return (dispatch) => {
    dispatch(latestPostIsLoading(true));

    database.ref("posts").limitToLast(1).once("value", (result) => {
      const data = result.val();
      const postDate = Object.keys(data)[0];
      const post = data[postDate];
      post.date = postDate;
      dispatch(latestPost(post));
      dispatch(latestPostIsLoading(false));
    });
  };
}
