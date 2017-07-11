import React from 'react';
import Map from '../../components/Map/Map';

import './TripMap.css';

const TripMap = () => (
  <div className='trip-map u-spaced-top--double'>
    <div className='trip-map__inner'>
      <Map data={{
        mapType: 'full-height',
        nwlat: -33.598607,
        nwlng: 165.322266,
        selat: -47.829752,
        selng: 179.384766
      }}/>
    </div>
  </div>
);

export default TripMap;
