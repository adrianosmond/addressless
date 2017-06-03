import React from 'react';

import './TextLead.css';

const TextLead = (props) => (
  <p className="text-lead">{props.data.text}</p>
);

export default TextLead;
