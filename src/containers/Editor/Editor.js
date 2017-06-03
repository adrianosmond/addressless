import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import ListPosts from './EditorList.js';
import NewPost from './EditorNew.js';
import EditPost from './EditorEdit.js';

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
