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

    db.ref(`posts/${postDate}`).once('value', (result) => {
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

  postTop() {
    return (
      <div className='post-top-wrapper'>
        <div className='container container--padded-top'>
          <Link to={'/'}>Home</Link> &gt; <Link to={'/posts'}>Posts</Link>
        </div>
        <div className='post-title-and-date'>
          <PostSection sectiontype='metadata' sectiondata={{ date: this.state.postDate, location: this.state.postData.location}} />
          <PostSection sectiontype='heading' sectiondata={{ text: this.state.postData.title, level: 1}} />
        </div>
      </div>
    )
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
    
    if (this.state.postData.title) {
      document.title = `${this.state.postData.title} - Upside Down & Addressless`;
    }

    return (
      <article className='post'>
        { this.state.postData.titlePhoto?
          <div className='post-title-holder' style={{backgroundImage: `url(${this.state.postData.titlePhoto})`}}>
            {this.postTop()}
          </div> : this.postTop() }

        {this.state.postData.contents ? this.state.postData.contents.map((section, idx) => {
          return (
            <PostSection key={idx} sectiontype={section.type} sectiondata={section.data} />
          );
        }) : ''}
        {/* <PostSection sectiontype='statslist' sectiondata={{fullWidth: true}} /> */}
      </article>
    );
  }
}

export default Post;
