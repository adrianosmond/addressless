import React, { Component } from 'react';
import db from '../../lib/db';
import { Link } from 'react-router-dom';

import './LatestPhotos.css';

class LatestPhotos extends Component {
  state = {
    data: {}
  }

  componentWillMount() {
    db.ref("photos").limitToLast(3).once("value", (result) => {
      const data = result.val();
      this.setState({
        data: data
      });
    });
  }

  render () {
    if (Object.keys(this.state.data).length === 0) {
      return null;
    }
    console.log(this.state.data);
    return (
      <div className="home-grid__item home-grid__item--photos">
        <div className="home-grid__heading">
          <h2 className="home-grid__subtitle">Latest Photos</h2>
          <Link className="home-grid__more-link" to="/stats">View all photos</Link>
        </div>
        <div className="latest-photos-grid">
          {Object.keys(this.state.data).map((photoDate) => {
            const photo = this.state.data[photoDate];
            console.log(photo);
            return (
              <div key={photoDate} className="latest-photos-grid__item" style={{backgroundImage: `url(${photo.url})`}}></div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default LatestPhotos;
