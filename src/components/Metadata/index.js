import React, { Component } from 'react';
import moment from 'moment';

import './index.css';

class Metadata extends Component {
  formatDate (dateStr) {
    const date = moment(dateStr)
    return (
      <span>
        {date.format("MMMM D")}
        <sup>{date.format("Do").substr(-2)}</sup>
        {date.format(", YYYY")}
      </span>
    );
  }

  render () {
    return (
      <p className="metadata">{this.formatDate(this.props.data.postDate)} - {this.props.data.location}</p>
    );
  }
}

export default Metadata;
