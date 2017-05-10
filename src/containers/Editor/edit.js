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

  handleChange(input, e) {
    const change = {
      postData: {
        [input]: e.target.value
      }
    };
    this.setState(change);
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
                <PostSectionEditor key={idx} sectiontype={section.type} sectiondata={section.data} />
              );
            }) : ''}
            <p><button>Add Section</button></p>
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
