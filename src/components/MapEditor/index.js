import React, { Component } from 'react';

class MapEditor extends Component {
  render () {
    return (
      <div>
        <label>
          Latitude:
          <input type="text" className="post-section-editor__input" value={this.props.data.centerlat} onChange={this.props.changeContents.bind(this, 'centerlat')} />
        </label>
        <label>
          Longitude:
          <input type="text" className="post-section-editor__input" value={this.props.data.centerlng} onChange={this.props.changeContents.bind(this, 'centerlng')} />
        </label>
        <label>
          Zoom
          <input type="text" className="post-section-editor__input" value={this.props.data.zoom} onChange={this.props.changeContents.bind(this, 'zoom')} />
        </label>
      </div>
    );
  }
}

export default MapEditor;
