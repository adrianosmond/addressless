import React from 'react';
import Metadata from '../Metadata/Metadata';

import './PostPreview.css';

const PostPreview = (props) => (
  <div className="post-preview">
    <Metadata className="post-preview__metadata" data={{date: props.date, location: "London"}} />
    <h2 className="h4 post-preview__title">{props.data.title}</h2>
    {(props.data.contents && props.data.contents.length > 0)
      ? <p className="post-preview__teaser">{props.data.contents[0].data.text}</p>
      : null }
  </div>
);

export default PostPreview;
