import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds, meters2ScreenPixels } from 'google-map-react/utils';
import mapOptions from './mapOptions.json';
import terrainMapOptions from './terrainMapOptions.json';
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

    const bounds = {
      nw: {
        lat: this.props.data.nwlat,
        lng: this.props.data.nwlng,
      },
      se: {
        lat: this.props.data.selat,
        lng: this.props.data.selng,
      }
    };

    const {center, zoom} = fitBounds(bounds, size);

    if (this.props.containerHeight) {
      const mapHeight = meters2ScreenPixels(1400000, center, zoom).h;
      this.props.containerHeight(mapHeight);
    }

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
          center={this.state.center.lat ? this.state.center : {lat: -40.9006, lng: 172.8860}}
          zoom={this.state.zoom > 0 ? this.state.zoom : 5}
          onChange={this.calculateCenterAndZoom.bind(this)}
          options={this.props.data.mapStyle==='terrain'? terrainMapOptions : mapOptions}
          onGoogleApiLoaded={this.props.data.mapRoute? ({map, maps}) => {
            let pathColour = '#a8c9ff';
            if (this.props.data.mapStyle === 'terrain') {
              pathColour = '#ff0000';
            }
            map.data.setStyle({
              strokeColor: pathColour
            });
            map.data.loadGeoJson(this.props.data.mapRoute);
          } : null}
          yesIWantToUseGoogleMapApiInternals
        >{this.props.children}</GoogleMapReact>
      </div>
    );
  }
}

export default Map;
