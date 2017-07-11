import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPhotoList } from '../../actions/photoList';
import moment from 'moment';
import { database as db } from '../../lib/firebase';

const authors = ["Adrian", "Dina"];

class EditorNew extends Component {
  state = {
    day: moment().format('DD'),
    month: moment().format('MM'),
    year: moment().format('YYYY'),
    title: '',
    titlePhoto: '',
    location: '',
    author: 'dina'
  }

  componentWillMount() {
    this.props.loadPhotos();
  }

  handleChange(input, e) {
    const change = {
      [input]: e.target.value
    };
    this.setState(change);
  }

  createPost() {
    const date = `${this.state.year}-${this.state.month}-${this.state.day}`;
    const post = {
      title: this.state.title,
      titlePhoto: this.state.titlePhoto,
      location: this.state.location,
      author: this.state.author,
      published: false
    };
    db.ref(`posts/${date}`).set(post).then(() => {
      this.setState({
        redirectTo: `/editor/${date}`
      })
    });
  }

  render() {
    if (this.state.redirectTo) {
      return (
        <Redirect to={this.state.redirectTo} />
      );
    }

    return (
      <div className='post-section'>
        <div className='container'>
          <p>Date</p>
          <input type='text' value={this.state.day} placeholder='DD' name='day' maxLength='2' onChange={this.handleChange.bind(this, 'day')} />
          <input type='text' value={this.state.month} placeholder='MM' name='month' maxLength='2' onChange={this.handleChange.bind(this, 'month')} />
          <input type='text' value={this.state.year} placeholder='YYYY' name='year' maxLength='4' onChange={this.handleChange.bind(this, 'year')} />
          <p>Title</p>
          <input type='text' value={this.state.title} placeholder='Post title...' name='title' onChange={this.handleChange.bind(this, 'title')} />
          <p>Title photo:</p>
          { this.props.isLoading ? ' Loading ' :
            <select value={this.state.titlePhoto} onChange={this.handleChange.bind(this, 'titlePhoto')}>
              <option value=''>None</option>
              {this.props.photos ? Object.keys(this.props.photos).map((photoId) => {
                return (
                  <option key={photoId} value={this.props.photos[photoId].url}>{this.props.photos[photoId].title}</option>
                );
              }) : null}
            </select>
          }
          <p>{this.state.titlePhoto !== '' ? <img src={this.state.titlePhoto} width='300px' alt='' /> : null }</p>
          <p>Location</p>
          <input type='text' value={this.state.location} placeholder='Location' name='location' onChange={this.handleChange.bind(this, 'location')} />
          <p>Author</p>
          <select name='author' onChange={this.handleChange.bind(this, 'author')} value={this.state.author}>
            {authors.map((author) => {
              return (
                <option key={author} value={author.toLowerCase()}>{author}</option>
              );
            })}
          </select>
          <p>
            <button onClick={this.createPost.bind(this)}>Create Post</button>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditorNew);
