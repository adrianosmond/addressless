import React, { Component } from 'react';

import './LoadingPhoto.css';

class LoadingPhoto extends Component {
  state = {
    imgLoaded: false
  }

  componentWillMount () {
    if (this.props.img) {
      console.log(this.props.img);
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
    if (this.state.imgLoaded) {
      return <div className="loading-photo loading-photo--loaded" style={{backgroundImage: `url(${this.props.img})`, backgroundSize: 'cover'}}></div>
    }
    return (
      <div className="loading-photo"></div>
    );
  }
};

export default LoadingPhoto
