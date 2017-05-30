import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './containers/Home';
import Post from './containers/Post';
import Editor from './containers/Editor';

// const AsyncHome = () => {
//   let Component = null;
//
//   import('./containers/Home')
//   .then(({ Home }) => {
//     Component = Home;
//     console.log("LOADED!");
//   })
//   .catch(err => {
//     console.log("Home didn't load: ", err);
//   });
//
//   return (
//     Component ? Component : null
//   );
// }

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
