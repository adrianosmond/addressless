import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { database as db } from '../../lib/firebase';

import PostSection from '../../components/PostSection/PostSection';
import LoadingPost from '../../views/LoadingPost/LoadingPost';

import './Post.css';

class Post extends Component {
  state = {
  }

  componentWillMount() {
    const postDate = this.props.match.params.postDate;

    db.ref(`posts/${postDate}`).once("value", (result) => {
      const postData = result.val();
      if (postData === null) {
        this.setState({
          postNotFound: true
        });
      } else {
        this.setState({
          postDate: postDate,
          postData
        });
      }
    });
  }

  render() {
    if (this.state.postNotFound) {
      return (
        <Redirect to='/posts' />
      );
    }

    if (!this.state.postData) {
      return (
        <div>
          <div className='container container--padded-top'>
            <Link to={'/'}>Home</Link> &gt; <Link to={'/posts'}>Posts</Link>
          </div>
          <div className='container container--padded'>
            <LoadingPost />
          </div>
        </div>
      );
    }

    return (
      <article className="post">
        <div className="container container--padded-top">
          <Link to={'/'}>Home</Link> &gt; <Link to={'/posts'}>Posts</Link>
        </div>
        <PostSection sectiontype="metadata" sectiondata={{ date: this.state.postDate, location: this.state.postData.location}} />
        <PostSection sectiontype="heading" sectiondata={{ text: this.state.postData.title, level: 1}} />
        {this.state.postData.contents ? this.state.postData.contents.map((section, idx) => {
          return (
            <PostSection key={idx} sectiontype={section.type} sectiondata={section.data} />
          );
        }) : ''}
        {/* <PostSection sectiontype="statslist" sectiondata={{fullWidth: true}} /> */}
      </article>
    );
  }
}

export default Post;
