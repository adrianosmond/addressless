import React, { Component } from 'react';
import db from '../../lib/db';
import { Link } from 'react-router-dom';

class Home extends Component {
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
        <h2>Blog</h2>
        <ul>
          {this.state.posts.map((post) => {
            return (
              <li key={post.date}><Link to={'/posts/' + post.date}>{post.title}</Link></li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default Home;
