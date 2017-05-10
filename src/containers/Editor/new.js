import React, { Component } from 'react';
import moment from 'moment';
// import { Link } from 'react-router-dom';

// import db from '../../lib/db';

class NewPost extends Component {
  state = {
    day: moment().format('DD'),
    month: moment().format('MM'),
    year: moment().format('YYYY'),
    title: ''
  }

  // componentWillMount() {
  // }

  render() {
    return (
      <div className="post-section">
        <div className="post-section__inner">
          <p>Date</p>
          <input type="text" value={this.state.day} placeholder="DD" name="day" maxLength="2" />
          <input type="text" value={this.state.month} placeholder="MM" name="month" maxLength="2" />
          <input type="text" value={this.state.year} placeholder="YYYY" name="year" maxLength="4" />
          <p>Title</p>
          <input type="text" placeholder="Post title..." value={this.state.title} />
          <button>Create Post</button>
        </div>
      </div>
    );
  }
}

export default NewPost;
