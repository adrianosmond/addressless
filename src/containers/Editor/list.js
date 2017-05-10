import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import db from '../../lib/db';

class ListPosts extends Component {
  state = {
    posts: []
  }

  componentWillMount() {
    db.ref("posts").once("value", (result) => {

      const allPosts = result.val();
      let postArray = [];
      for (let post in allPosts) {
        postArray.push({
          date: post,
          title: allPosts[post].title
        });
      }

      this.setState({
        posts: postArray
      });
    });
  }

  render() {
    return (
      <div>
        <h1>List</h1>
        <ul>
          {this.state.posts.map((post, idx) => {
            return (
              <li key={idx}><Link to={'/editor/' + post.date}>{post.title}</Link></li>
            );
          })}
        </ul>
        <Link to="/editor/new">New Post</Link>
      </div>
    );
  }
}

export default ListPosts;
