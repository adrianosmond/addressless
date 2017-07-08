import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { database as db } from '../../lib/firebase';

import PostPreview from '../../views/PostPreview/PostPreview';

class PostList extends Component {
  state = {
    posts: []
  }

  componentWillMount() {
    db.ref('posts').once('value', (result) => {
      const allPosts = result.val();
      let postArray = [];
      for (let post in allPosts) {
        postArray.unshift({
          date: post,
          data: allPosts[post]
        });
      }
      this.setState({
        posts: postArray
      });
    });
  }

  render() {
    return (
      <div className='container container--padded'>
        <Link to={'/'}>Home</Link> &gt;
        <h1 className='u-spaced-top'>All Posts</h1>
        <ul className='post-list'>
          {this.state.posts.map((post, idx) => {
            return (
              <li key={idx} className='post-list__item'>
                <PostPreview data={post.data} date={post.date} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PostList;
