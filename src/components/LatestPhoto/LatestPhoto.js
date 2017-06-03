import React, { Component } from 'react';
import db from '../../lib/db';
import { Link } from 'react-router-dom';

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
      <div className="home-grid__item home-grid__item--photo">
        <div className="home-grid__heading">
          <h2 className="home-grid__subtitle">Latest Photos</h2>
          <Link className="home-grid__more-link" to="/stats">View all photos</Link>
        </div>
      </div>
    );
  }
}

export default LatestPhoto;
