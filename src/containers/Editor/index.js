import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import ListPosts from './list.js';
import NewPost from './new.js';
import EditPost from './edit.js';

class Editor extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/editor' component={ListPosts} />
        <Route path='/editor/new' component={NewPost} />
        <Route path='/editor/:postDate' component={EditPost} />
      </Switch>
    );
  }
}

export default Editor;
