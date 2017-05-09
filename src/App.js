import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import './assets/styles/base/reset.css';
import './assets/styles/base/base.css';

import Home from './components/Home';
import Post from './components/Post';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/posts/:postDate" component={Post}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
