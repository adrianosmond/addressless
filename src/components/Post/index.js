import React, { Component } from 'react';
import db from '../../lib/db';

import PostSection from '../PostSection';

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
      <article>
        <PostSection sectiontype="metadata" sectiondata={{ date: this.state.postDate, location: this.state.postData.location}} />
        <PostSection sectiontype="heading" sectiondata={{ text: this.state.postData.title, level: 1}} />
        {this.state.postData.contents.map((section, idx) => {
          return (
            <PostSection key={idx} sectiontype={section.type} sectiondata={section.data} />
          );
        })}
      </article>
    );
  }
}

export default Post;
