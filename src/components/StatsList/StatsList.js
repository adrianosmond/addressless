import React, { Component } from 'react';

import './StatsList.css';

class StatBlock extends Component {
  render () {
    return (
      <ul className="stats-list">
        <li className="stats-list__stat">
          <span className="stats-list__number">13,285</span>
          <span className="stats-list__description">steps</span>
        </li>
        <li className="stats-list__stat">
          <span className="stats-list__number">16.24<span className="stats-list__unit"> km</span></span>
          <span className="stats-list__description">walked</span>
        </li>
        <li className="stats-list__stat">
          <span className="stats-list__number">285.7<span className="stats-list__unit"> km</span></span>
          <span className="stats-list__description">driven</span>
        </li>
        <li className="stats-list__stat">
          <span className="stats-list__number">58</span>
          <span className="stats-list__description">photos</span>
        </li>
      </ul>
    );
  }
}

export default StatBlock;
