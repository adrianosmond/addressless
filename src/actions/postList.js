import { database } from '../lib/firebase';

export function postListIsLoading(bool) {
  return {
    type: 'POST_LIST_IS_LOADING',
    isLoading: bool
  };
}

export function postList(posts) {
  return {
    type: 'POST_LIST_RECEIVED',
    posts
  };
}

export function loadPostList() {
  return (dispatch) => {
    dispatch(postListIsLoading(true));

    database.ref('posts').once('value', (result) => {
      const allPosts = result.val();
      let postArray = [];
      for (let post in allPosts) {
        postArray.unshift({
          date: post,
          data: allPosts[post]
        });
      }
      dispatch(postList(postArray));
      dispatch(postListIsLoading(false));
    });
  };
}
