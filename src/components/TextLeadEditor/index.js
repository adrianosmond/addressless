import React, { Component } from 'react';

class TextLeadEditor extends Component {
  render () {
    return (
      <textarea className="post-section-editor__textarea" value={this.props.data.text}></textarea>
    );
  }
}

export default TextLeadEditor;
