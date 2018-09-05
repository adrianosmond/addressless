import React from 'react'
import { formatDate } from '../utils/date'

import './Metadata.css'

const Metadata = ({date, location, isPost}) =>
  <p className={`metadata${ isPost ? ' metadata--post' : ''}`}>{formatDate(date)} - {location}</p>

export default Metadata