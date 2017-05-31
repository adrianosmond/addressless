import React, { Component } from 'react';
import db from '../../lib/db';
import { Link } from 'react-router-dom';

import PostPreview from '../../views/PostPreview/PostPreview';
import './LatestPost.css';

class LatestPost extends Component {
  state = {
    post: {}
  }

  componentWillMount() {
    db.ref("posts").limitToLast(1).once("value", (result) => {
      const data = result.val()
      const postDate = Object.keys(data)[0];
      this.setState({
        post: data[postDate]
      });
      console.log(data[postDate])
    });
  }

  render () {
    return (
      <div className="preview preview--post">
        <h2 className="home-grid__subtitle">Latest Post</h2>
        <PostPreview />
        <Link className="home-grid__more-link" to="/posts/list">View all posts</Link>
      </div>
    );
  }
}

export default LatestPost;
