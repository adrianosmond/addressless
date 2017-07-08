import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { urlSafeString } from '../../lib/utils';
import { loadPhotoList } from '../../actions/photoList';

import LoadingPhoto from '../../components/LoadingPhoto/LoadingPhoto';

const placeholders = {
  "first": {},
  "second": {},
  "third": {}
};

class PhotosList extends Component {
  componentWillMount() {
    this.props.loadPhotos();
  }

  render() {
    let photos = placeholders;
    if (Object.keys(this.props.photos).length > 0) {
      photos = this.props.photos;
    }

    return (
      <div className='container container--padded'>
        <Link to={'/'}>Home</Link> &gt; All Photos
        <h1 className='u-spaced-top--half'>All Photos</h1>
        <div className='photos-grid u-spaced-top--double'>
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
    photos: state.photoList,
    isLoading: state.photoListIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPhotos: () => dispatch(loadPhotoList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosList);
