import React from 'react'

import './Caption.css'

const Caption = ({ caption }) => 
  caption ?
  <div className="container">
    <figcaption className="caption">{ caption }</figcaption>
  </div>
  : null

export default Caption