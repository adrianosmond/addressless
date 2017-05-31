import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// import Async from 'react-code-splitting';

import Home from './containers/Home';
// const Home = () => <Async load={import('./containers/Home')} />
import Post from './containers/Post';
// const Post = () => <Async load={import('./containers/Post')} />
import Editor from './containers/Editor';
// const Editor = () => <Async load={import('./containers/Editor')} />

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/posts/:postDate" component={Post}/>
          <Route path="/editor" component={Editor}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
