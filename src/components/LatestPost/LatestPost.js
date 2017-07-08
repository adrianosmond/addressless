import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadLatestPost } from '../../actions/latestPost';

import PostPreview from '../../views/PostPreview/PostPreview';

class LatestPost extends Component {
  componentWillMount() {
    this.props.loadPost();
  }

  render () {
    return (
      <div className="home-grid__item home-grid__item--post">
        <div className="home-grid__heading">
          <h2 className="home-grid__subtitle">Latest Post</h2>
          <Link className="home-grid__more-link" to="/posts/">View all posts</Link>
        </div>
        {this.props.date === "" ? null : <PostPreview data={this.props.post} date={this.props.post.date} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.latestPost,
    isLoading: state.latestPostIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPost: () => dispatch(loadLatestPost())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestPost);
