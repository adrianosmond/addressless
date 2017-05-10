import React, { Component } from 'react';

import db from '../../lib/db';

import PostSectionEditor from '../../components/PostSectionEditor';

const authors = ["Adrian", "Dina"];

class EditPost extends Component {
  state = {
  }

  componentWillMount() {
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
        url: '/assets/images/img.jpg',
        alt: '',
        caption: ''
      };
    } else if (type === 'map') {
      return {
        center : {
          lat : 51.504362,
          lng : -0.126343
        },
        zoom : 12
      };
    }
  }

  handleChange(input, e) {
    const change = {
      postData: {
        [input]: e.target.value
      }
    };
    console.log(change);
    this.setState(change);
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
    postData.contents[index].type = e.target.value;
    postData.contents[index].data = this.getEmptyObjectData(e.target.value);
    this.setState({
      postData
    });
  }

  changeContents(index, field, e) {
    let postData = this.state.postData;
    postData.contents[index].data[field] = e.target.value;
    this.setState({
      postData
    });
  }

  savePost() {
  }

  deletePost() {
  }

  render() {
    if (!this.state.postData) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div className="post-section">
        <div className="post-section__inner">
          <p>Date: {this.state.postDate}</p>
          <p>Title</p>
          <input type="text" value={this.state.postData.title} placeholder="Post title..." name="title" onChange={this.handleChange.bind(this, 'title')} />
          <p>Location</p>
          <input type="text" value={this.state.postData.location} placeholder="Location" name="location" onChange={this.handleChange.bind(this, 'location')} />
          <p>Author</p>
          <select name="author" onChange={this.handleChange.bind(this, 'author')} value={this.state.postData.author}>
            {authors.map((author) => {
              return (
                <option key={author} value={author.toLowerCase()}>{author}</option>
              );
            })}
          </select>

          <div>
            {this.state.postData.contents? this.state.postData.contents.map((section, idx) => {
              return (
                <PostSectionEditor key={idx} sectiontype={section.type} sectiondata={section.data}
                  changeSectionType={this.changeSectionType.bind(this, idx)}
                  changeContents={this.changeContents.bind(this, idx)} />
              );
            }) : ''}
            <p><button onClick={this.addSection.bind(this)}>Add Section</button></p>
          </div>

          <p>
            <button onClick={this.savePost.bind(this)}>Save Post</button>
            <button onClick={this.deletePost.bind(this)}>Delete Post</button>
          </p>
        </div>
      </div>
    );
  }
}

export default EditPost;
