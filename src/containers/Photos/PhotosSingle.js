import React, { Component } from 'react';
import {database as db} from '../../lib/firebase';

import Photo from '../../components/Photo/Photo';

class SinglePhoto extends Component {
  state = {
    title: ""
  }
  componentWillMount() {
    db.ref(`photos/${this.props.match.params.photoId}`).once("value", (result) => {
      this.setState(result.val());
    })
  }

  render() {
    if (this.state.title === '') {
      return null;
    }

    return (
      <Photo data={this.state} nocaption={true} nomargin={true} />
    );
  }
}

export default SinglePhoto;
