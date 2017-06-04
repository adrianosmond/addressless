import React from 'react';

const MapEditor = (props) => (
  <div>
    <label>
      NW Latitude:
      <input type="text" className="post-section-editor__input" value={props.data.nwlat} onChange={props.changeContents.bind(this, 'nwlat')} />
    </label>
    <label>
      NW Longitude:
      <input type="text" className="post-section-editor__input" value={props.data.nwlng} onChange={props.changeContents.bind(this, 'nwlng')} />
    </label>
    <label>
      SE Latitude:
      <input type="text" className="post-section-editor__input" value={props.data.nwlat} onChange={props.changeContents.bind(this, 'selat')} />
    </label>
    <label>
      SE Longitude:
      <input type="text" className="post-section-editor__input" value={props.data.nwlng} onChange={props.changeContents.bind(this, 'selng')} />
    </label>
  </div>
);

export default MapEditor;
