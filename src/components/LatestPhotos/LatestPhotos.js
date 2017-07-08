import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { urlSafeString } from '../../lib/utils';
import { loadLatestPhotos } from '../../actions/latestPhotos';

import LoadingPhoto from '../../components/LoadingPhoto/LoadingPhoto';

import './LatestPhotos.css';

const placeholders = {
  "first": {},
  "second": {},
  "third": {}
};

class LatestPhotos extends Component {
  componentWillMount() {
    this.props.loadPhotos();
  }

  render () {
    let photos = placeholders;
    if (Object.keys(this.props.photos).length > 0) {
      photos = this.props.photos;
    }

    return (
      <div className='home-grid__item home-grid__item--photos'>
        <div className='home-grid__heading'>
          <h2 className='home-grid__subtitle'>Latest Photos</h2>
          <Link className='home-grid__more-link' to='/photos'>View all photos</Link>
        </div>
        <div className='photos-grid'>
          {Object.keys(photos).reverse().map((id) => {
            const photo = this.props.photos[id];
            if (photo) {
              return (
                <Link to={`photos/${urlSafeString(photo.title)}/${id}`} key={id} className='photos-grid__item'>
                  <LoadingPhoto img={`${photo.url}`} />
                </Link>
              );
            } else {
              return (
                <LoadingPhoto key={id} />
              );
            }
          })}
        </div>
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
