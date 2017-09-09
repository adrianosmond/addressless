import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadPostList } from '../../actions/postList';
import PostPreview from '../../views/PostPreview/PostPreview';

const placeholders = [{}, {}, {}];

class PostList extends Component {
  componentWillMount() {
    this.props.loadPosts()
  }

  render() {
    let posts = placeholders;
    if (!this.props.isLoading) {
      if (this.props.posts.length > 0) {
        posts = this.props.posts;
      } else {
        posts = [];
      }
    }
    return (
      <div className='container container--padded'>
        <h1 className="u-screen-reader">All Posts</h1>
        <Link to={'/'}>Home</Link> &gt; All Posts
        <ul className='post-list'>
          {posts.filter((post) => {
            return !post.data || post.data.published === true
          }).map((post, idx) => {
            return (
              <li key={idx} className='post-list__item'>
                { post.data? <PostPreview data={post.data} date={post.date} /> : <PostPreview /> }
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    posts: state.postList,
    isLoading: state.postListIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPosts: () => dispatch(loadPostList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
