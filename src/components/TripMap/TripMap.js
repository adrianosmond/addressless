import React, { Component } from 'react';
import Map from "../Map/Map";

import "./TripMap.css";

class TripMap extends Component {
  render () {
    return (
      <div className="preview preview--map">
        <Map data={{
          mapType: 'full-height',
          bounds: {
            nw: {
              lat: -33.598607,
              lng: 165.322266
            },
            se: {
              lat: -47.829752,
              lng: 179.384766
            }
          }
        }}/>
      </div>
    );
  }
}

export default TripMap;
