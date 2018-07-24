import React, { Component } from 'react';

class Photo extends Component {
  caption () {
    return this.props.caption ? (
      <div className="container">
        <figcaption className="photo__caption">{this.props.caption}</figcaption>
      </div>
    ) : null;
  }

  photo () {
    return (
      <figure className={'photo' + (this.props.caption ? ' photo--with-caption' : '')}>
        <img src={this.props.url} className="photo__img" alt={this.props.alt } />
        {this.caption()}
      </figure>
    );
  }

  render () {
    if (this.props.fullwidth) {
      return this.photo()
    }
    return (
      <div className="post-section">
        <div className="container">
          {this.photo()}
        </div>
      </div>
    );
  }
}

export default Photo;
