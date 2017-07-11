import React from 'react';
import Map from '../../components/Map/Map';

import './TripMap.css';

const TripMap = () => (
  <div className='trip-map u-spaced-top--double'>
    <div className='trip-map__inner'>
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
  </div>
);

export default TripMap;
