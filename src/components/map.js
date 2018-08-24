import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import Caption from './caption'

import './map.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFub3Ntb25kIiwiYSI6ImNqa3pvcTlmYTB0b20zcHMxdGVwdXd3dDgifQ.F1bLhz5g91FlzHnt5_PYIw';

const rem = (width) => {
  if (width >= 1500) return 20;
  if (width >= 600) return 18;
  return 16;
}

class Map extends Component {
  componentDidMount() {
    const styleUrl = this.props.type==='homepage' ?
      'mapbox://styles/adrianosmond/cjl6t297y0y862spkzf80gzij' :
      'mapbox://styles/adrianosmond/cjl629ie90e3j2so0zlblahux';

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: styleUrl,
      interactive: false,
      center: [172.8860, -40.9006],
      zoom: 4,
    });

    if (this.props.route) {
      this.map.on('load', () => this.loadRoute(this.props.route));
    }
  }

  loadRoute(route) {
    fetch(route)
      .then(r => r.json())
      .then(data => this.addGeoJson(data))
      .then(data => this.setMapBounds(data));
  }

  addGeoJson(data) {
    this.map.addLayer({
      id: `route`,
      type: 'line',
      source: {
        type: 'geojson',
        data,
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#ad1d1d',
        'line-width': 1,
      },
    });
    return data;
  }

  setMapBounds(data) {
    const bounds = new mapboxgl.LngLatBounds();
    const pageWidth = window.innerWidth;
    const r = rem(pageWidth);
    const verticalPadding = 2 * r;
    let horizontalPadding;
    if (pageWidth < 600) {
      horizontalPadding = r;
    } else if (pageWidth < 52 * r) {
      horizontalPadding = 2 * r;
    } else {
      horizontalPadding = (pageWidth - (52 * r)) / 2;
    }
      
    if (this.props.type === 'homepage') {
      // Bounds for the whole of New Zealand
      bounds.setNorthEast([179, -34.5])
      bounds.setSouthWest([166, -47.5])
    } else {
      data.features.forEach(feature => feature.geometry.coordinates.forEach(bounds.extend.bind(bounds)));
    }
    this.map.fitBounds(bounds, {
      duration: 0,
      padding: {
        top: verticalPadding,
        right: horizontalPadding,
        bottom: verticalPadding,
        left: horizontalPadding
      },
      maxZoom: 12.9 // Terrain shading gets disabled at zoom 13
    });
  }

  render () {
    return (
      <figure className={`map map--${this.props.type}` + (this.props.caption ? ' map--with-caption' : '')}>
        <div className="map__map" ref={(el) => {this.mapContainer = el;}}></div>
        <Caption caption={this.props.caption} />
      </figure>
    );
  }
}

export default Map;
