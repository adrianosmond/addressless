import React, { Component } from 'react';

import db from '../../lib/db';

import PostSectionEditor from '../../components/PostSectionEditor/PostSectionEditor';

const authors = ["Adrian", "Dina"];
const globalSectionProps = ["fullWidth", "color"];

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
        centerlat : 51.504362,
        centerlng : -0.126343,
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
