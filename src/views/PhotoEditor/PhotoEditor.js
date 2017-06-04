import React from 'react';

const PhotoEditor = (props) => (
  <div>
    <label>
      URL:
      <input type="text" className="post-section-editor__input" value={props.data.url} onChange={props.changeContents.bind(this, 'url')} />
    </label>
    <label>
      Alt Text
      <input type="text" className="post-section-editor__input" value={props.data.alt} onChange={props.changeContents.bind(this, 'alt')} />
    </label>
    <label>
      Caption (optional)
      <input type="text" className="post-section-editor__input" value={props.data.caption} onChange={props.changeContents.bind(this, 'caption')} />
    </label>
  </div>
);

export default PhotoEditor;
