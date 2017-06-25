import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { database as db } from '../../lib/firebase';

import PostSection from '../../components/PostSection/PostSection';

import './Post.css';

class Post extends Component {
  state = {
  }

  componentWillMount() {
    const postDate = this.props.match.params.postDate;

    db.ref(`posts/${postDate}`).once("value", (result) => {
      this.setState({
        postDate: postDate,
        postData: result.val()
      });
    });
  }

  render() {
    if (!this.state.postData) {
      return (
        <div>Loading</div>
      );
    }

    return (
      <article className="post">
        <div className="post-section">
          <div className="post-section__inner">
            <Link to={'/'}>Sizzing Steaks &amp; Sleepy Potatoes</Link> &gt; <Link to={'/posts'}>Posts</Link> &gt;
          </div>
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
