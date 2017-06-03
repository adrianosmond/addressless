import React from 'react';
import { formatDate } from '../../lib/utils';

import './Metadata.css';

const Metadata = (props) => (
  <p className="metadata">{formatDate(props.data.date)} - {props.data.location}</p>
);

export default Metadata;
