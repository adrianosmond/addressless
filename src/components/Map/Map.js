import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds, meters2ScreenPixels } from 'google-map-react/utils';
import mapOptions from './mapOptions.json';
import terrainMapOptions from './terrainMapOptions.json';
import MapMarker from '../../views/MapMarker/MapMarker';
import './Map.css';

class Map extends Component {
  state = {
    center: {},
    zoom: -1,
    endPoint: {
      lat: 0,
      lng: 0
    }
  }

  bounds = {
    nw: {
      lat: 0,
      lng: 0,
    },
    se: {
      lat: 0,
      lng: 0,
    }
  }

  setEndPoint(endLatLng) {
    this.setState({
      endPoint: {
        lat: endLatLng[1],
        lng: endLatLng[0]
      }
    })
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

    const {center, zoom} = fitBounds(this.bounds, size);

    if (this.props.containerHeight) {
      const mapHeight = meters2ScreenPixels(1400000, center, zoom).h;
      this.props.containerHeight(mapHeight);
    }

    this.setState({
      center,
      zoom
    });
  }

  processData(map) {
    let minLat = 180;
    let minLng = 180;
    let maxLat = -180;
    let maxLng = -180;

    fetch(this.props.data.mapRoute).then(r => r.json())
    .then(data => {
      map.data.addGeoJson(data);
      data.features.forEach(feature => {
        feature.geometry.coordinates.forEach(latLng => {
          minLat = Math.min(minLat, latLng[1]);
          maxLat = Math.max(maxLat, latLng[1]);
          minLng = Math.min(minLng, latLng[0]);
          maxLng = Math.max(maxLng, latLng[0]);
        });
      })

      this.bounds = {
        nw: {
          lat: maxLat,
          lng: minLng,
        },
        se: {
          lat: minLat,
          lng: maxLng,
        }
      };

      this.calculateCenterAndZoom();

      if (this.props.data.mapType==='homepage') {
        this.setEndPoint(data.features[0].geometry.coordinates[data.features[0].geometry.coordinates.length-1]);
      }
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
              strokeColor: pathColour,
              strokeWeight: 1.5,
              strokeOpacity: 0.9
            });
            this.processData(map);
          } : null}
          yesIWantToUseGoogleMapApiInternals
        >{this.props.data.mapType === 'homepage' ?
            <MapMarker lat={this.state.endPoint.lat} lng={this.state.endPoint.lng} />
            : null
          }</GoogleMapReact>
      </div>
    );
  }
}

export default Map;
