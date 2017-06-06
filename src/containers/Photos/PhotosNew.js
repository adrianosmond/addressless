import React, { Component } from 'react';
import {database as db, storage} from '../../lib/firebase.js';

class PhotosNew extends Component {
  render() {
    return (
      <div style={{padding: "2rem"}}>
        <input type="text" placeholder="File path" /><br/>
        <input type="file" /><br/>
        <button>Upload</button>
      </div>
    );
  }
}

export default PhotosNew;
