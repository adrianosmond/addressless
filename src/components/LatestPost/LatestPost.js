import React, { Component } from 'react';
import { database as db } from '../../lib/firebase';
import { Link } from 'react-router-dom';

import PostPreview from '../../views/PostPreview/PostPreview';

class LatestPost extends Component {
  state = {
    date: "",
    post: {}
  }

  componentWillMount() {
    db.ref("posts").limitToLast(1).once("value", (result) => {
      const data = result.val()
      const postDate = Object.keys(data)[0];
      this.setState({
        date: postDate,
        post: data[postDate]
      });
    });
  }

  render () {
    if (this.state.date === "") {
      return null;
    }
    return (
      <div className="home-grid__item home-grid__item--post">
        <div className="home-grid__heading">
          <h2 className="home-grid__subtitle">Latest Post</h2>
          <Link className="home-grid__more-link" to="/posts/list">View all posts</Link>
        </div>
        <PostPreview data={this.state.post} date={this.state.date} />
      </div>
    );
  }
}

export default LatestPost;
