import React from 'react'

import './MapStoryControls.css'

const MapStoryControls = ({
    loadedMap,
    loadingInteractive,
    loadedInteractive,
    start,
    next
  }) =>
  !loadedMap ? null :
  <div className="map-story-controls">
    { !loadedInteractive ?
      <button onClick={start} disabled={loadingInteractive}>Start</button> :
      <button onClick={next}>Next</button> }
  </div>

export default MapStoryControls
