import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPhotoList } from '../../actions/photoList';

class PhotoEditor extends Component {
  componentWillMount() {
    this.props.loadPhotos();
  }
  changePhoto(e) {
    const photo = this.props.photos[e.target.value];
    console.log('changePhoto', photo);
    this.props.changeContents.call(this, 'id', e);
    this.props.changeContents.call(this, 'url', {target: {value: photo.url}});
    this.props.changeContents.call(this, 'caption', {target: {value: photo.caption}});
  }

  render () {
    return (
      <div>
        <label>
          Photo:
          { this.props.isLoading ? ' Loading ' :
            <select value={this.props.data.id} onChange={this.changePhoto.bind(this)}>
              {Object.keys(this.props.photos).map((photoId) => {
                return (
                  <option key={photoId} value={photoId}>{this.props.photos[photoId].title}</option>
                );
              })}
            </select>
          }
        </label>
        <p>{this.props.photos[this.props.data.id] ? <img src={this.props.photos[this.props.data.id].url} width='300px' alt='' /> : null }</p>
        <label hidden>
          URL
          <input type="text" className="post-section-editor__input" value={this.props.data.url} onChange={this.props.changeContents.bind(this, 'alt')} />
        </label>
        <label>
          Caption (optional)
          <input type="text" className="post-section-editor__input" value={this.props.data.caption} onChange={this.props.changeContents.bind(this, 'caption')} />
        </label>
      </div>
    );
  }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(PhotoEditor);
