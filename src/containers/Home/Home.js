import React, { Component } from 'react';

import LatestPost from '../../components/LatestPost/LatestPost';
import LatestPhotos from '../../components/LatestPhotos/LatestPhotos';
import StatsSummary from '../../components/StatsSummary/StatsSummary';
import TripMap from '../../components/TripMap/TripMap';

import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="home-grid">
        <h1 className="home-grid__item--title">
          Adrian &amp; Dina<br/> in New Zealand
        </h1>
        <LatestPost />
        <LatestPhotos />
        <StatsSummary />
        <TripMap />
      </div>
    );
  }
}

export default Home;
