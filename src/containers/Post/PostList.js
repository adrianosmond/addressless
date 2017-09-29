import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadPostList } from '../../actions/postList';
import PostsList from '../../views/PostList/PostList';

const placeholders = [{}, {}, {}];

class PostList extends Component {
  componentWillMount() {
    this.props.loadPosts()
  }

  render() {
    document.title = 'All Posts - Upside Down & Addressless';
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
        <PostsList posts={posts} />
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
