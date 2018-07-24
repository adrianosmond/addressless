import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds, meters2ScreenPixels } from 'google-map-react/utils';
import mapOptions from './mapOptions.json';
import terrainMapOptions from './terrainMapOptions.json';

class Map extends Component {
  state = {
    center: {},
    zoom: -1,
    endPoint: {
      lat: 0,
      lng: 0
    }
  }

  static defaultProps = {
    mapstyle: "article",
    maptype: "terrain"
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

  caption () {
    return this.props.caption ? (
      <div className="container">
        <figcaption className="map__caption">{this.props.caption}</figcaption>
      </div>
    ) : null;
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

    fetch(this.props.route).then(r => r.json())
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

      if (this.props.type==='homepage') {
        this.setEndPoint(data.features[0].geometry.coordinates[data.features[0].geometry.coordinates.length-1]);
      }
    });
  }

  render () {
    return (
      <figure className={`map map--${this.props.type}` + (this.props.caption ? ' map--with-caption' : '')} ref={(el) => {this.container = el;}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: 'AIzaSyBukDmt04LqDkmRpbL340AWRYUyA2cHt2Y'}}
          center={this.state.center.lat ? this.state.center : {lat: -40.9006, lng: 172.8860}}
          zoom={this.state.zoom > 0 ? this.state.zoom : 5}
          onChange={this.calculateCenterAndZoom.bind(this)}
          options={this.props.layer==='terrain'? terrainMapOptions : mapOptions}
          onGoogleApiLoaded={this.props.route? ({map, maps}) => {
            let pathColour = '#a8c9ff';
            if (this.props.layer === 'terrain') {
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
        ></GoogleMapReact>
        {this.caption()}
      </figure>
    );
  }
}

export default Map;