import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// eslint-disable-next-line
import {database as db} from './lib/firebase';
// eslint-disable-next-line
import moment from 'moment';

import './assets/styles/reset.css';
import './assets/styles/base.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
