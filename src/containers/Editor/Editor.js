import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import EditorList from './EditorList.js';
import EditorNew from './EditorNew.js';
import EditorEdit from './EditorEdit.js';

class Editor extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/editor' component={EditorList} />
        <Route path='/editor/new' component={EditorNew} />
        <Route path='/editor/:postDate' component={EditorEdit} />
      </Switch>
    );
  }
}

export default Editor;
