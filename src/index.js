import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';
// eslint-disable-next-line
import {database as db} from './lib/firebase';
// eslint-disable-next-line
import moment from 'moment';

import './assets/styles/reset.css';
import './assets/styles/base.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
