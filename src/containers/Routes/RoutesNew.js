import React, { Component } from 'react';
import {database as db, storage} from '../../lib/firebase.js';

class RoutesNew extends Component {
  state = {
    title: '',
    file: null,
    uploading: false,
    progress: 0
  }

  changeTitle(event) {
    this.setState({
      title: event.target.value
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

    const url = `routes/${this.state.file.name}`;
    const title = this.state.title ? this.state.title : null;

    this.setState({
      uploading: true,
      progress: 0
    });

    const uploadTask = storage.ref().child(url).put(this.state.file);

    uploadTask.on('state_changed',
      (snapshot) => {
        console.log("PROGRESS", ((snapshot.bytesTransferred / snapshot.totalBytes) * 100), snapshot);
        this.setState({
          progress: ((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        });
      }, (error) => {
        console.log("UPLOAD FAILED", error);
      }, () => {
        console.log("UPLOAD COMPLETE");
        db.ref('routes').push({
          url: uploadTask.snapshot.downloadURL,
          title
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
        <input type="file" onChange={this.changeFile.bind(this)} /><br/>
        <button onClick={this.doUpload.bind(this)}>Upload</button>
        {this.state.uploading ? <div>Uploading progress: {this.state.progress}%</div> : null}
      </div>
    );
  }
}

export default RoutesNew;
