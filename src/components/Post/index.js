import React, { Component } from 'react';
import db from '../../lib/db';
import moment from 'moment';

import PostSection from '../PostSection';

import './index.css';


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

  formatDate (dateStr) {
    const date = moment(dateStr)
    return (
      <span>
        {date.format("MMMM D")}
        <sup>{date.format("Do").substr(-2)}</sup>
        {date.format(", YYYY")}
      </span>
    );
  }

  postSection () {

  }

  render() {
    if (!this.state.postData) {
      return (
        <div>Loading</div>
      );
    }

    return (
      <article className="article">
    		<div className="row">
    			<div className="row__inner">
            <p className="article__metadata">{this.formatDate(this.state.postDate)} - {this.state.postData.location}</p>
            <h1>{this.state.postData.title}</h1>
          </div>
        </div>
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
