import React, { Component } from 'react';

import './LoadingPhoto.css';


class LoadingPhoto extends Component {
  state = {
    imgLoaded: false
  }

  constructor () {
    super();

    this.imgObj = new Image();
  }

  componentWillMount () {
    if (!this.props.img) {
      return;
    }

    this.boundLoadListener = this.imgLoadListener.bind(this);

    this.imgObj.addEventListener('load', this.boundLoadListener);
    this.imgObj.src = this.props.img;
  }

  componentWillUnmount () {
    this.imgObj.removeEventListener('load', this.boundLoadListener);
  }

  imgLoadListener() {
    this.setState({
      imgLoaded: true
    });
  }

  render () {
    return (
      <div className={this.state.imgLoaded ? 'loading-photo loading-photo--loaded' : 'loading-photo'}
          style={ (this.state.imgLoaded && this.props.img) ? {backgroundImage: `url(${this.props.img})`} : {} }></div>
    );
  }
};

export default LoadingPhoto
