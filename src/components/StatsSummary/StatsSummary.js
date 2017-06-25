import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadStats } from '../../actions/tripStats';

import TripStatsChart from '../TripStatsChart/TripStatsChart';


class StatsSummary extends Component {
  componentWillMount() {
    this.props.loadStats();
  }

  render () {
    return (
      <div className="home-grid__item home-grid__item--stats">
        <div className="home-grid__heading">
          <h2 className="home-grid__subtitle">Trip Stats</h2>
          <Link className="home-grid__more-link" to="/stats">View full stats</Link>
        </div>
        {Object.keys(this.props.stats).length > 0 ? <TripStatsChart data={this.props.stats} /> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stats: state.tripStats,
    isLoading: state.tripStatsAreLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStats: () => dispatch(loadStats())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsSummary);
