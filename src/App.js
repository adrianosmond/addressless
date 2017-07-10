import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// import Async from 'react-code-splitting';

import Home from './containers/Home/Home';
// const Home = () => <Async load={import('./containers/Home/Home')} />
import Post from './containers/Post/Post';
// const Post = () => <Async load={import('./containers/Post/Post')} />
import Photos from './containers/Photos/Photos';
// const Photos = () => <Async load={import('./containers/Photos/Photos')} />
import Routes from './containers/Routes/Routes';
// const Photos = () => <Async load={import('./containers/Routes/Routes')} />
import Editor from './containers/Editor/Editor';
// const Editor = () => <Async load={import('./containers/Editor/Editor')} />

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/posts' component={Post}/>
          <Route path='/photos' component={Photos}/>
          <Route path='/editor' component={Editor}/>
          <Route path='/routes' component={Routes}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
