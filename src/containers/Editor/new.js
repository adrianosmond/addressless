import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import db from '../../lib/db';

class NewPost extends Component {
  state = {
    day: moment().format('DD'),
    month: moment().format('MM'),
    year: moment().format('YYYY'),
    title: ''
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
      title: this.state.title
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
      <div className="post-section">
        <div className="post-section__inner">
          <p>Date</p>
          <input type="text" value={this.state.day} placeholder="DD" name="day" maxLength="2" onChange={this.handleChange.bind(this, 'day')} />
          <input type="text" value={this.state.month} placeholder="MM" name="month" maxLength="2" onChange={this.handleChange.bind(this, 'month')} />
          <input type="text" value={this.state.year} placeholder="YYYY" name="year" maxLength="4" onChange={this.handleChange.bind(this, 'year')} />
          <p>Title</p>
          <input type="text" value={this.state.title} placeholder="Post title..." name="title" onChange={this.handleChange.bind(this, 'title')} />
          <button onClick={this.createPost.bind(this)}>Create Post</button>
        </div>
      </div>
    );
  }
}

export default NewPost;
