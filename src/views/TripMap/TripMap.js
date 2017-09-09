import React, { Component } from 'react';
import Map from '../../components/Map/Map';

import './TripMap.css';

class TripMap extends Component {
  state = {
  }

  render () {
    return (
      <div className='trip-map u-spaced-top--double' style={this.state.height? {paddingBottom: 0, height: this.state.height}: null}>
        <div className='trip-map__inner'>
          <Map data={{
              mapType: 'full-height',
              nwlat: -34.389254,
              nwlng: 166.393606,
              selat: -46.703266,
              selng: 178.631522
            }}
            containerHeight={(height) => {
              this.setState({
                height
              })
            }}
          />
        </div>
      </div>
    );
  }
}
export default TripMap;
