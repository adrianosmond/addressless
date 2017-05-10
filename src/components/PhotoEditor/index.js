import React, { Component } from 'react';

class PhotoEditor extends Component {
  caption () {
    if (this.props.data.caption) {
      return (
        <figcaption className="photo__caption">{this.props.data.caption}</figcaption>
      );
    }
  }

  render () {
    return (
      <div>
        <label>
          URL:
          <input type="text" className="post-section-editor__input" value={this.props.data.url} />
        </label>
        <label>
          Alt Text
          <input type="text" className="post-section-editor__input" value={this.props.data.alt} />
        </label>
        <label>
          Caption (optional)
          <input type="text" className="post-section-editor__input" value={this.props.data.caption} />
        </label>
      </div>
    );
  }
}

export default PhotoEditor;
