import React, { Component } from 'react';

import './LoadingPhoto.css';

class LoadingPhoto extends Component {
  state = {
    imgLoaded: false
  }

  componentWillMount () {
    if (!this.props.img) {
      return;
    }

    const img = new Image();
    img.onload = () => {
      this.setState({
        imgLoaded: true
      })
    }
    img.src = this.props.img;
  }

  render () {
    return (
      <div className={this.state.imgLoaded ? 'loading-photo loading-photo--loaded' : 'loading-photo'}
          style={ (this.state.imgLoaded && this.props.img) ? {backgroundImage: `url(${this.props.img})`} : {} }></div>
    );
  }
};

export default LoadingPhoto
