import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { database as db } from '../../lib/firebase';
import { urlSafeString } from '../../lib/utils';

import LoadingPhoto from '../../views/LoadingPhoto/LoadingPhoto';

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
    return (
      <div className="home-grid__item home-grid__item--photos">
        <div className="home-grid__heading">
          <h2 className="home-grid__subtitle">Latest Photos</h2>
          <Link className="home-grid__more-link" to="/photos">View all photos</Link>
        </div>
        {Object.keys(this.state.data).length === 0 ?
          <div className="latest-photos-grid">
            <div className="latest-photos-grid__item">
              <LoadingPhoto />
            </div>
            <div className="latest-photos-grid__item">
              <LoadingPhoto />
            </div>
            <div className="latest-photos-grid__item">
              <LoadingPhoto />
            </div>
          </div> :
          <div className="latest-photos-grid">
            {Object.keys(this.state.data).reverse().map((id) => {
              const photo = this.state.data[id];
              return (
                <Link to={`photos/${urlSafeString(photo.title)}/${id}`} key={id} className="latest-photos-grid__item" style={{backgroundImage: `url(${photo.url})`}}></Link>
              );
            })}
          </div>}
      </div>
    );
  }
}

export default LatestPhotos;
