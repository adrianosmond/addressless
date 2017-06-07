import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import ListPhotos from './PhotosList.js';
import NewPhoto from './PhotosNew.js';
import SinglePhoto from './PhotosSingle.js';

class Photos extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/photos' component={ListPhotos} />
        <Route path='/photos/new' component={NewPhoto} />
        <Route path='/photos/:photoTitle/:photoId' component={SinglePhoto} />
      </Switch>
    );
  }
}

export default Photos;
