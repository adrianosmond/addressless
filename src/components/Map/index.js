import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapOptions from './options.json';

import './index.css';

class Map extends Component {
  render () {
    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyBukDmt04LqDkmRpbL340AWRYUyA2cHt2Y'}}
          defaultCenter={this.props.data.center}
          defaultZoom={this.props.data.zoom}
          options={mapOptions}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default Map;
