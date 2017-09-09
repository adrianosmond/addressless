import React, { Component } from 'react';
import {database as db, storage} from '../../lib/firebase.js';

class PhotosNew extends Component {
  state = {
    title: '',
    caption: '',
    file: null,
    uploading: false,
    progress: 0
  }

  changeTitle(event) {
    this.setState({
      title: event.target.value
    })
  }

  changeCaption(event) {
    this.setState({
      caption: event.target.value
    })
  }

  changeFile (event) {
    this.setState({
      file: event.target.files[0]
    });
  }

  doUpload () {
    if (!this.state.file) {
      return;
    }

    const url = `images/${this.state.file.name}`;
    const title = this.state.title ? this.state.title : null;
    const caption = this.state.caption ? this.state.caption : null;

    this.setState({
      uploading: true,
      progress: 0
    });

    const uploadTask = storage.ref().child(url).put(this.state.file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // console.log("PROGRESS", ((snapshot.bytesTransferred / snapshot.totalBytes) * 100), snapshot);
        this.setState({
          progress: ((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        });
      }, (error) => {
        // console.log("UPLOAD FAILED", error);
      }, () => {
        // console.log("UPLOAD COMPLETE");
        db.ref('photos').push({
          url: uploadTask.snapshot.downloadURL,
          title,
          caption
        });

        this.setState({
          uploading: false,
          progress: 0
        });
      }
    );
  }

  render () {
    return (
      <div style={{padding: "2rem"}}>
        <input type="text" value={this.state.title} onChange={this.changeTitle.bind(this)} placeholder="Title"/><br/>
        <input type="text" value={this.state.caption} onChange={this.changeCaption.bind(this)} placeholder="Caption"/><br/>
        <input type="file" onChange={this.changeFile.bind(this)} /><br/>
        <button onClick={this.doUpload.bind(this)}>Upload</button>
        {this.state.uploading ? <div>Uploading progress: {this.state.progress}%</div> : null}
      </div>
    );
  }
}

export default PhotosNew;
