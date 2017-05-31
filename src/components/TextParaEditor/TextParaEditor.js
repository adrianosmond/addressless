import React, { Component } from 'react';

class TextParaEditor extends Component {
  render () {
    return (
      <textarea className="post-section-editor__textarea" value={this.props.data.text} onChange={this.props.changeContents.bind(this, 'text')}></textarea>
    );
  }
}

export default TextParaEditor;