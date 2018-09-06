import React from 'react';
import Caption from './Caption'

import './Photo.css'

const renderPhoto = (caption, url, alt) =>
  <figure className={'photo' + (caption ? ' photo--with-caption' : '')}>
    <img src={url} className="photo__img" alt={alt } />
    <Caption caption={caption} />
  </figure>

const Photo = ({ fullwidth, caption, url, alt }) => {
  if (fullwidth) {
    return renderPhoto(caption, url, alt)
  }
  return (
    <div className="photo-wrapper">
      <div className="container">
        {renderPhoto(caption, url, alt)}
      </div>
    </div>
  );
}

export default Photo;
