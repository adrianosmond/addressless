import React from 'react';
import { Link } from 'react-router-dom';

import Metadata from '../Metadata/Metadata';

import './PostPreview.css';

const PostPreview = (props) => (
  <Link to={`/posts/${props.date}`} className="post-preview">
    <Metadata className="post-preview__metadata" data={{date: props.date, location: "London"}} />
    <h2 className="h4 post-preview__title">{props.data.title}</h2>
    {(props.data.contents && props.data.contents.length > 0)
      ? <p className="post-preview__teaser">{props.data.contents[0].data.text}</p>
      : null }
  </Link>
);

export default PostPreview;
