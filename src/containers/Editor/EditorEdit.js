import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPhotoList } from '../../actions/photoList';
import { database as db } from '../../lib/firebase';
import PostSectionEditor from '../../components/PostSectionEditor/PostSectionEditor';

const authors = ["Adrian", "Dina"];
const globalSectionProps = ["fullWidth", "color"];

class EditorEdit extends Component {
  state = {
    deleted: false
  }

  componentWillMount() {
    this.props.loadPhotos();

    const postDate = this.props.match.params.postDate;

    db.ref(`posts/${postDate}`).once("value", (result) => {
      this.setState({
        postDate: postDate,
        postData: result.val()
      });
    });
  }

  getEmptyObject(type) {
    return {
      type: type,
      data: this.getEmptyObjectData(type)
    }
  }

  getEmptyObjectData(type) {
    if (type === 'text' || type === 'lead' || type === 'quote') {
      return {
        text: 'Enter text here'
      };
    } else if (type === 'heading') {
      return {
        text: 'Enter text here',
        level: 2
      };
    } else if (type === 'photo') {
      return {
        id: '',
        url: '',
        alt: '',
        caption: ''
      };
    } else if (type === 'map') {
      return {
        mapStyle: 'terrain',
        mapRoute: '',
        nwlat: -40.31841,
        nwlng: 171.77124,
        selat: -41.526186,
        selng: 174.506836,
        mapType: 'article'
      };
    }
  }

  handleChange(input, e) {
    let postData = this.state.postData;

    if (input === 'published') {
      postData[input] = e.target.checked;
    } else {
      postData[input] = e.target.value;
    }

    this.setState({
      postData
    });
  }

  addSection() {
    let postData = this.state.postData;
    if (!postData.contents) {
      postData.contents = [];
    }
    postData.contents.push(this.getEmptyObject('text'));

    this.setState({
      postData
    });
  }

  changeSectionType(index, e) {
    let postData = this.state.postData;
    const oldData = postData.contents[index].data
    let newData = this.getEmptyObjectData(e.target.value);
    for (const prop in oldData) {
      if (newData[prop] || globalSectionProps.indexOf(prop) >= 0) {
        newData[prop] = oldData[prop];
      }
    }
    postData.contents[index].type = e.target.value;
    postData.contents[index].data = newData;
    this.setState({
      postData
    });
  }

  changeSectionColor(index, e) {
    const color = e.target.value;
    let postData = this.state.postData;
    if (color === 'none') {
      delete postData.contents[index].data.color;
    } else {
      postData.contents[index].data.color = color;
    }
    this.setState({
      postData
    });
  }

  changeContents(index, field, e) {
    let postData = this.state.postData;
    if (typeof postData.contents[index].data[field] === 'number') {
      postData.contents[index].data[field] = parseFloat(e.target.value);
    } else {
      postData.contents[index].data[field] = e.target.value;
    }
    this.setState({
      postData
    });
  }

  moveSectionUp(index) {
    this.switchSections(index, index - 1);
  }

  moveSectionDown(index) {
    this.switchSections(index, index + 1);
  }

  switchSections(x, y) {
    let postData = this.state.postData;
    const tmp = postData.contents[x];
    postData.contents[x] = postData.contents[y];
    postData.contents[y] = tmp;
    this.setState({
      postData
    });
  }

  deleteSection(index) {
    let postData = this.state.postData;
    postData.contents = postData.contents.filter((el , i) => {return index !== i});
    this.setState({
      postData
    });
  }

  toggleFullWidth(index) {
    let postData = this.state.postData;
    if (postData.contents[index].data.fullWidth) {
      delete postData.contents[index].data.fullWidth;
    } else {
      postData.contents[index].data.fullWidth = true;
    }
    this.setState({
      postData
    });
  }

  savePost() {
    db.ref(`posts/${this.state.postDate}`).set(this.state.postData).then(() => {
      alert('Saved!');
    });
  }

  deletePost() {
    if (window.confirm('Are you sure you want to delete this post?')) {
      db.ref(`posts/${this.state.postDate}`).set(null).then(() => {
        this.setState({
          deleted: true
        })
      });
    }
  }

  render() {
    if (this.state.deleted) {
      return (
        <Redirect to='/editor' />
      );
    }

    if (!this.state.postData) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className='post-section'>
        <div className='container container--padded'>
          <p>Date: {this.state.postDate}</p>
          <p>Title</p>
          <input type='text' value={this.state.postData.title} placeholder='Post title...' name='title' onChange={this.handleChange.bind(this, 'title')} />
          <p>Title photo:</p>
          { this.props.isLoading ? ' Loading ' :
            <select value={this.state.postData.titlePhoto} onChange={this.handleChange.bind(this, 'titlePhoto')}>
              <option value=''>None</option>
              {this.props.photos ? Object.keys(this.props.photos).map((photoId) => {
                return (
                  <option key={photoId} value={this.props.photos[photoId].url}>{this.props.photos[photoId].title}</option>
                );
              }) : null}
            </select>
          }
          <p>Location</p>
          <input type='text' value={this.state.postData.location} placeholder='Location' name='location' onChange={this.handleChange.bind(this, 'location')} />
          <p>Author</p>
          <select name='author' onChange={this.handleChange.bind(this, 'author')} value={this.state.postData.author}>
            {authors.map((author) => {
              return (
                <option key={author} value={author.toLowerCase()}>{author}</option>
              );
            })}
          </select>
          <p>Published <input type='checkbox' checked={this.state.postData.published} onChange={this.handleChange.bind(this, 'published')}  /></p>

          <div>
            {this.state.postData.contents? this.state.postData.contents.map((section, idx) => {
              return (
                <PostSectionEditor key={idx} sectiontype={section.type} sectiondata={section.data}
                  canGoUp={idx>0}
                  moveUp={this.moveSectionUp.bind(this, idx)}
                  canGoDown={idx < this.state.postData.contents.length - 1}
                  moveDown={this.moveSectionDown.bind(this, idx)}
                  changeSectionType={this.changeSectionType.bind(this, idx)}
                  changeSectionColor={this.changeSectionColor.bind(this, idx)}
                  changeContents={this.changeContents.bind(this, idx)}
                  toggleFullWidth={this.toggleFullWidth.bind(this, idx)}
                  deleteSection={this.deleteSection.bind(this, idx)} />
              );
            }) : ''}
            <p className='u-spaced-top--double'><button onClick={this.addSection.bind(this)}>Add Section</button></p>
          </div>

          <p className='u-spaced-top--half'>
            <button onClick={this.savePost.bind(this)}>Save Post</button>
            <button onClick={this.deletePost.bind(this)}>Delete Post</button>
          </p>
          <p>
            <Link to={`/posts/${this.props.match.params.postDate}`} target="_blank">View this post</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditorEdit);
