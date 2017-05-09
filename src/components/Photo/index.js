import React, { Component } from 'react';

import './index.css';

class Photo extends Component {
  caption () {
    if (this.props.data.caption) {
      return (
        <figcaption className="photo__caption">{this.props.data.caption}</figcaption>
      );
    }
  }

  render () {
    return (
      <figure className={'photo' + (this.props.data.caption ? ' photo--with-caption' : '')}>
        <img src={this.props.data.url} className="photo__img" alt={this.props.data.alt } />
        {this.caption()}
      </figure>
    );
  }
}

export default Photo;
