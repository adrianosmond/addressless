import React from 'react';

import './Quote.css';

const Quote = (props) => (
  <blockquote className="quote">
    <p className="quote__text h4">{props.data.text}</p>
  </blockquote>
);

export default Quote;
