import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import db from '../../lib/db';

class EditPost extends Component {
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
    return (
      <div>Edit {this.props.match.params.postDate}</div>
    );
  }
}

export default EditPost;
