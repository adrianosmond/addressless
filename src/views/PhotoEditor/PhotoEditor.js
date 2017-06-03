import React from 'react';

const PhotoEditor = (props) => (
  <div>
    <label>
      URL:
      <input type="text" className="post-section-editor__input" value={this.props.data.url} onChange={this.props.changeContents.bind(this, 'url')} />
    </label>
    <label>
      Alt Text
      <input type="text" className="post-section-editor__input" value={this.props.data.alt} onChange={this.props.changeContents.bind(this, 'alt')} />
    </label>
    <label>
      Caption (optional)
      <input type="text" className="post-section-editor__input" value={this.props.data.caption} onChange={this.props.changeContents.bind(this, 'caption')} />
    </label>
  </div>
);

export default PhotoEditor;
