import React from 'react';
import { Link } from 'react-router-dom';
import { urlSafeString } from '../../lib/utils';
import Metadata from '../Metadata/Metadata';
import LoadingPost from '../LoadingPost/LoadingPost';

import './PostPreview.css';

const PostPreview = (props) => {
  if (props.data && props.data.contents && props.data.contents.length > 0) {
    return (
      <Link to={`/posts/${props.date}/${urlSafeString(props.data.title)}`} className="post-preview">
        <Metadata className="post-preview__metadata" data={{date: props.date, location: props.data.location}} />
        <h2 className="h4 h2-small post-preview__title">{props.data.title}</h2>
        <p className="post-preview__teaser">{props.data.contents[0].data.text}</p>
      </Link>
    )
  }
  return <LoadingPost />;
};

export default PostPreview;
