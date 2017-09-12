import React, { Component } from 'react';

import TripMap from '../../views/TripMap/TripMap';

import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>
          Addressless
        </h1>
        <TripMap />
      </div>
    );
  }
}

export default Home;
