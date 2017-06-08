import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { urlSafeString } from '../../lib/utils';
import { loadLatestPhotos } from '../../actions/latestPhotos';

import LoadingPhoto from '../../components/LoadingPhoto/LoadingPhoto';

import './LatestPhotos.css';

class LatestPhotos extends Component {
  componentWillMount() {
    // if (Array.isArray(this.props.photos)) {
      this.props.loadPhotos();
    // }
  }

  placeholderGrid() {
    console.log("RENDERED PLACEHOLDERS");
    return (
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
      </div>
    );
  }

  render () {
    return (
      <div className="home-grid__item home-grid__item--photos">
        <div className="home-grid__heading">
          <h2 className="home-grid__subtitle">Latest Photos</h2>
          <Link className="home-grid__more-link" to="/photos">View all photos</Link>
        </div>
        {
          Object.keys(this.props.photos).length === 0 ?
            this.placeholderGrid()
          :
            <div className="latest-photos-grid">
              {Object.keys(this.props.photos).reverse().map((id) => {
                const photo = this.props.photos[id];
                return (
                  <Link to={`photos/${urlSafeString(photo.title)}/${id}`} key={id} className="latest-photos-grid__item">
                    <LoadingPhoto img={`${photo.url}`} />
                  </Link>
                );
              })}
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.latestPhotos,
    isLoading: state.latestPhotosAreLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPhotos: () => dispatch(loadLatestPhotos())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestPhotos);
