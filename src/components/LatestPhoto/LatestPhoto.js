import React, { Component } from 'react';
import db from '../../lib/db';
// import { Link } from 'react-router-dom';

import "./LatestPhoto.css";

class LatestPhoto extends Component {
  state = {
    photo: {}
  }

  componentWillMount() {
    db.ref("photos").limitToLast(1).once("value", (result) => {
      const data = result.val()
      const photoDate = Object.keys(data)[0];
      this.setState({
        photo: data[photoDate]
      });
    });
  }

  render () {
    if (!this.state.photo.url) {
      return null;
    }
    return (
      <div className="preview preview--photo" style={{backgroundImage: `url('${this.state.photo.url}')`}}>
      </div>
    );
  }
}

export default LatestPhoto;
