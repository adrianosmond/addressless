import React, { Component } from 'react';

import './TextLead.css';

class TextLead extends Component {
  render () {
    return (
      <p className="text-lead">{this.props.data.text}</p>
    );
  }
}

export default TextLead;
