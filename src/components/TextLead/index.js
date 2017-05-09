import React, { Component } from 'react';

class TextLead extends Component {
  render () {
    return (
      <p className="article__lead">{this.props.data.text}</p>
    );
  }
}

export default TextLead;
