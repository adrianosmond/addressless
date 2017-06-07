import React, { Component } from 'react';

class SinglePhoto extends Component {
  render() {
    return (
      <div>
        Single photos {this.props.match.params.photoId}
      </div>
    );
  }
}

export default SinglePhoto;
