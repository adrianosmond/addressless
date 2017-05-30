import React, { Component } from 'react';
// import db from '../../lib/db';

import LatestPost from '../../components/LatestPost/LatestPost';
import LatestPhoto from '../../components/LatestPhoto/LatestPhoto';
import StatsSummary from '../../components/StatsSummary/StatsSummary';
import TripMap from '../../components/TripMap/TripMap';

import "./Home.css";


class Home extends Component {
  render() {
    return (
      <div className="home-grid">
        <h1 className="home-grid__title">Adrian &amp; Dina<br/> in New Zealand</h1>
        <LatestPost />
        <LatestPhoto />
        <TripMap />
        <StatsSummary />
      </div>
    );
  }
}

export default Home;
