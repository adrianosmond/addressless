import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import RoutesNew from './RoutesNew.js';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path='/routes/new' component={RoutesNew} />
      </Switch>
    );
  }
}

export default Routes;
