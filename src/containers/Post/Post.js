import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import PostList from './PostList.js';
import PostView from './PostView.js';

class Post extends Component {
  render() {
    console.log("POST Component");
    return (
      <Switch>
        <Route exact path='/posts' component={PostList} />
        <Route path='/posts/:postDate' component={PostView} />
      </Switch>
    );
  }
}

export default Post;
