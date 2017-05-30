import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import mapOptions from './mapOptions.json';

import './Map.css';

class Map extends Component {
  state = {
    center: {},
    zoom: -1
  }

  componentDidMount() {
    this.calculateCenterAndZoom();
  }

  calculateCenterAndZoom(newData) {
    if (this.container === null) return;
    if (newData) {
      this.setState({
        center: newData.center
      });
    }

    const size = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };

    const {center, zoom} = fitBounds(this.props.data.bounds, size);
    this.setState({
      center,
      zoom
    });
  }

  render () {
    return (
      <div className={`map map--${this.props.data.mapType}`} ref={(el) => {this.container = el;}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyBukDmt04LqDkmRpbL340AWRYUyA2cHt2Y'}}
          defaultCenter={{lat: -40.9006, lng: 172.8860}}
          center={this.state.center.lat ? this.state.center : null}
          defaultZoom={5}
          zoom={this.state.zoom > 0 ? this.state.zoom : null}
          onChange={this.calculateCenterAndZoom.bind(this)}
          options={mapOptions}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default Map;
