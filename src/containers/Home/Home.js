import React, { Component } from 'react';

import LatestPost from '../../components/LatestPost/LatestPost';
import LatestPhotos from '../../components/LatestPhotos/LatestPhotos';
import StatsSummary from '../../components/StatsSummary/StatsSummary';
import TripMap from '../../views/TripMap/TripMap';

import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="home-grid">
        <div className="home-grid__item--title">
          <h1>
            Sizzling Steaks<br/>
            &amp; Sleepy Potatoes
          </h1>
        </div>
        <LatestPost />
        <LatestPhotos />
        <StatsSummary />
        <TripMap />
      </div>
    );
  }
}

export default Home;
