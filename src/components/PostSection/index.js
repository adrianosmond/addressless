import React, { Component } from 'react';
import Heading from '../Heading';
import Metadata from '../Metadata';
import TextLead from '../TextLead';
import TextPara from '../TextPara';
import Photo from '../Photo';
import Quote from '../Quote';
import Map from '../Map';

import './index.css';

const sectiontypes = {
  heading: Heading,
  metadata: Metadata,
  lead: TextLead,
  text: TextPara,
  photo: Photo,
  map: Map,
  quote: Quote,
}

class PostSection extends Component {
  inner (type, data) {
    const SectionTag = sectiontypes[type];
    return (
      <SectionTag data={data} />
    );
  }

  render () {
    if (this.props.sectiondata.fullWidth === true) {
      return this.inner(this.props.sectiontype, this.props.sectiondata);
    } else {
      return (
        <div className={'post-section' + ( this.props.sectiondata.color ? ' post-section--' + this.props.sectiondata.color : '' )}>
          <div className="post-section__inner">
            { this.inner(this.props.sectiontype, this.props.sectiondata) }
          </div>
        </div>
      );
    }
  }
}

export default PostSection;
