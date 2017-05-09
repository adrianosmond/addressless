import React, { Component } from 'react';

import './index.css';

class Quote extends Component {
  render () {
    return (
      <blockquote className="quote">
        <p className="quote__text h4">{this.props.data.text}</p>
      </blockquote>
    );
  }
}

export default Quote;
