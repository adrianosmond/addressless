import React, { Component } from 'react';

import './index.css';

class TextLead extends Component {
  render () {
    return (
      <p className="lead-text">{this.props.data.text}</p>
    );
  }
}

export default TextLead;
