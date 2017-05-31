import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// eslint-disable-next-line
import db from './lib/db';
// eslint-disable-next-line
import moment from 'moment';

import './assets/styles/reset.css';
import './assets/styles/base.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
