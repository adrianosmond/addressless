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
      'mapbox://styles/adrianosmond/cjl6t297y0y862spkzf80gzij?fetch=true' :
      'mapbox://styles/adrianosmond/cjl629ie90e3j2so0zlblahux';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: styleUrl,
      scrollZoom: false,
      center: [172.8860, -40.9006],
      zoom: 4,
    });

    if (this.props.route) {
      this.loadRoute()
    }
  }

  loadRoute() {
    this.map.on('load', () => {
      const pageWidth = window.innerWidth;
      const verticalPadding = 2 * rem(pageWidth);
      const horizontalPadding = ((pageWidth - (52 * rem(pageWidth))) / 2);
      fetch(this.props.route)
        .then(r => r.json())
        .then((data) => {
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
              'line-color': 'rgb(173,29,29)',
              'line-width': 2,
            },
          });

          const bounds = new mapboxgl.LngLatBounds();
          if (!this.props.type === 'homepage') {
            data.features.forEach(feature => feature.geometry.coordinates.forEach(bounds.extend.bind(bounds)));
          } else {
            bounds.setSouthWest([166.5, -47.0])
            bounds.setNorthEast([178.5, -34.5])
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
        });
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
