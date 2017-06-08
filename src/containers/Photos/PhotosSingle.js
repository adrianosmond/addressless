import React, { Component } from 'react';
import {database as db} from '../../lib/firebase';

import Heading from '../../views/Heading/Heading';
import Photo from '../../components/Photo/Photo';

class SinglePhoto extends Component {
  state = {
    title: ""
  }
  componentWillMount() {
    db.ref(`photos/${this.props.match.params.photoId}`).once("value", (result) => {
      // console.log(result.val());
      this.setState(result.val());
    })
  }

  render() {
    // console.log(this.state)

    if (this.state.title === '') {
      return null;
    }

    return (
      <article className="post">
        <div className="post-section">
          <div className="post-section__inner">
            <Heading data={{level: 1, text: this.state.title}} />
          </div>
        </div>

        <div className="post-section">
          <Photo data={this.state} />
        </div>
      </article>
    );
  }
}

export default SinglePhoto;
