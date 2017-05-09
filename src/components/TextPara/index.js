import React, { Component } from 'react';

class TextPara extends Component {
  render () {
    return (
      <p>{this.props.data.text}</p>
    );
  }
}

export default TextPara;
