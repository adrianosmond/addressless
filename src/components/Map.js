import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import Caption from './Caption'
import MapStoryControls from './MapStoryControls'

import { makePoint, makeStages, getBounds, getCoords, makeEmptyJsonLine, distance } from '../utils/map';

import './Map.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFub3Ntb25kIiwiYSI6ImNqa3pvcTlmYTB0b20zcHMxdGVwdXd3dDgifQ.F1bLhz5g91FlzHnt5_PYIw';

const rem = (width) => {
  if (width >= 1500) return 20;
  if (width >= 600) return 18;
  return 16;
}

let avgFrameTime = 80;
const LINE_COLOUR = '173,29,29';

const stages = makeStages();
const MAX_STAGE = stages.length;
const BIG_MOVEMENT_STAGES = [12, 20];
const BESPOKE_MOVEMENT_STAGES = [32, 57];
const bespokeMovements = {
  32: [
    [
      172.09259033203125,
      -41.29405931409848
    ],
    [
      171.47048950195312,
      -41.88310941663835
    ],
    [
      170.0182342529297,
      -43.46388409136904
    ]
  ],
  57: [
    [
      169.7010040283203,
      -46.245163369412836
    ],
    [
      167.73101806640625,
      -45.422070067226116
    ],
    [
      167.94113159179685,
      -44.676953912213165
    ]
  ]
}


class Map extends Component {
  state = {
    loadedMap: false,
    loadingInteractive: false,
    loadedInteractive: false,
    stage: 0,
    mapData: []
  }

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
      maxZoom: this.props.type === 'homepage' ? 8 : 12.9
    });

    if (this.props.route) {
      this.map.on('load', () => {
        this.setState({
          loadedMap: true
        })
        this.loadRoute(this.props.route)
      });
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

  startInteractive() {
    this.setState({ loadingInteractive: true });
    this.map.setLayoutProperty('route', 'visibility', 'none');
    this.map.setPaintProperty('water', 'fill-color', '#90aac1');
    this.map.addSource('point', {
      type: 'geojson',
      data: makePoint([0, 0])
    });

    this.map.addLayer({
      id: 'point',
      source: 'point',
      type: 'circle',
      paint: {
        'circle-radius': 3,
        'circle-color': `rgb(${LINE_COLOUR})`
      }
    });

    const mapData = []

    Promise.all(stages.map(date => fetch(`/route/trip/${date}.json`).then(r => r.json())))
      .then(allData => {
        allData.forEach((data, idx) => {
            this.map.addLayer({
              id: `segment-${idx}`,
              type: 'line',
              source: {
                type: 'geojson',
                data
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
                'visibility': 'none'
              },
              paint: {
                'line-color': `rgb(${LINE_COLOUR})`,
                'line-width': 1.5,
              },
            });
            mapData[idx] = data;
          })

        this.setState({
          loadedInteractive: true,
          mapData
        });
        requestAnimationFrame(() => this.startTrip())
      })
  }

  nextStage() {
    if (this.state.stage === 0) {
      this.startTrip();
    } else if (this.state.stage === MAX_STAGE) {
      this.resetTrip();
    } else {
      this.setState({
        stage: Math.min(MAX_STAGE, this.state.stage + 1)
      }, () => this.addToPath());
    }
  }

  startTrip() {
    stages.forEach((s, idx) => this.hideLayer(idx));
    this.map.fitBounds(getBounds(getCoords(this.state.mapData[0])));
    setTimeout(() => this.showLayer(0), 2000)
    this.setState({
      stage: Math.min(MAX_STAGE, this.state.stage + 1)
    });
  }

  hideLayer(idx) {
    this.map.setLayoutProperty(`segment-${idx}`, 'visibility', 'none');
  }

  showLayer(idx) {
    this.animatingCoords = getCoords(this.state.mapData[idx]);
    this.animatingLine = this.map.getSource(`segment-${idx}`);
    this.animatingMarker = this.map.getSource('point');
    this.animatingIdx = 0;
    this.animatingData = makeEmptyJsonLine();
    this.animatingLine.setData(this.animatingData);
    this.map.setLayoutProperty(`segment-${idx}`, 'visibility', 'visible');
    this.setState({
      animating: true
    })

    this.animatingStartTime = new Date().getTime();
    requestAnimationFrame(() => this.animateLine(idx))
  }


  animateLine(idx) {
    const current = this.animatingCoords[this.animatingIdx];
    this.animatingData.features[0].geometry.coordinates.push(current);
    this.animatingMarker.setData(makePoint(current));
    this.animatingLine.setData(this.animatingData);
    this.animatingIdx++;
    if (this.animatingIdx < this.animatingCoords.length) {
      requestAnimationFrame(() => this.animateLine(idx));
    } else {
      // only update avgFrameTime if we've moved significantly enough
      if (distance(this.animatingCoords[0], this.animatingCoords[this.animatingCoords.length - 1]) > 0.5) {
        avgFrameTime = (new Date().getTime() - this.animatingStartTime) / this.animatingCoords.length;
      }
      this.setState({
        animating: false
      });
      // if (this.markers[idx]) {
      //   this.markers[idx].addTo(this.map);
      // }
    }
  }

  addToPath() {
    const idx = this.state.stage - 1;
    this.showLayer(idx);
    if (idx > 0) {
      this.setLayerOpacity(idx - 1, 0.4);
    }
    if (idx > 1) {
      this.setLayerOpacity(idx - 2, 0.15);
    }
    if (BIG_MOVEMENT_STAGES.includes(idx)) {
      this.multiPanToLastCoord(idx);
    } else if (BESPOKE_MOVEMENT_STAGES.includes(idx)) {
      this.bespokePanTo(idx);
    } else {
      this.panToLastCoord(idx);
    }
  }

  setLayerOpacity(idx, opacity) {
    this.map.setPaintProperty(`segment-${idx}`, 'line-color', `rgba(${LINE_COLOUR},${opacity})`);
  }

  panToLastCoord(idx) {
    const coords = getCoords(this.state.mapData[idx]);
    this.map.panTo(coords[coords.length - 1], {
      duration: (coords.length * avgFrameTime),
    });
  }

  multiPanToLastCoord(idx) {
    const coords = getCoords(this.state.mapData[idx]);
    const halfCoords = Math.floor(coords.length/2);
    const halfWay = coords[halfCoords];
    const last = coords[coords.length - 1];
    this.map.panTo(halfWay, {
      duration: (halfCoords * avgFrameTime),
    });
    setTimeout(()=> {
      this.map.panTo(last, {
        duration: (halfCoords * avgFrameTime),
      });
    }, halfCoords * avgFrameTime);
  }

  bespokePanTo(idx) {
    const coords = getCoords(this.state.mapData[idx]);
    const waypoints = bespokeMovements[idx];
    const indices = waypoints.map(w => coords.findIndex(c => w[0]===c[0] && w[1] === c[1]));
    this.map.panTo(waypoints[0], {
      duration: (indices[0] * avgFrameTime),
    });
    indices.forEach((numPoints, i) => {
      if (i===0) return;
      setTimeout(() => {
        this.map.panTo(waypoints[i], {
          duration: ((indices[i] - indices[i-1]) * avgFrameTime),
        });
      }, (indices[i-1] * avgFrameTime));
    })
  }

  resetTrip() {
    stages.forEach((s, idx) => {
      this.setLayerOpacity(idx, 1);
      this.map.setLayoutProperty(`segment-${idx}`, 'visibility', 'visible');
      this.map.getSource('point').setData(makePoint([0,0]));
    });
    this.setMapBounds();
    this.setState({
      stage: 0
    });
  }

  render () {
    return (
      <figure className={`map map--${this.props.type}` + (this.props.caption ? ' map--with-caption' : '')}>
        <div className="map__map" ref={(el) => {this.mapContainer = el;}}></div>
        <Caption caption={this.props.caption} />
        { this.props.type === 'homepage' ? 
          <MapStoryControls
            start={() => this.startInteractive()}
            loadedMap={this.state.loadedMap}
            loadingInteractive={this.state.loadingInteractive}
            loadedInteractive={this.state.loadedInteractive}
            date={stages[this.state.stage - 1]}
            next={() => this.nextStage()}
            animating={this.state.animating} />
          : null }
      </figure>
    );
  }
}

export default Map;
