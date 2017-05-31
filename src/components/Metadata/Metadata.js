import React, { Component } from 'react';
import formatDate from '../../lib/utils';

import './Metadata.css';

class Metadata extends Component {
  render () {
    return (
      <p className="metadata">{formatDate(this.props.data.date)} - {this.props.data.location}</p>
    );
  }
}

export default Metadata;
