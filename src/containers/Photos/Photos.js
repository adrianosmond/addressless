import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import PhotosList from './PhotosList.js';
import PhotosNew from './PhotosNew.js';
import PhotosSingle from './PhotosSingle.js';

class Photos extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/photos' component={PhotosList} />
        <Route path='/photos/new' component={PhotosNew} />
        <Route path='/photos/:photoTitle/:photoId' component={PhotosSingle} />
      </Switch>
    );
  }
}

export default Photos;
