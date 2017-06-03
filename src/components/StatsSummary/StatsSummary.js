import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StatsSummary extends Component {
  render () {
    return (
      <div className="home-grid__item home-grid__item--stats">
        <div className="home-grid__heading">
          <h2 className="home-grid__subtitle">Trip Stats</h2>
          <Link className="home-grid__more-link" to="/stats">View full stats</Link>
        </div>
      </div>
    );
  }
}

export default StatsSummary;
