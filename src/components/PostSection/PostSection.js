import React, { Component } from 'react';
import Heading from '../../views/Heading/Heading';
import TextLead from '../../views/TextLead/TextLead';
import TextPara from '../../views/TextPara/TextPara';
import Photo from '../Photo/Photo';
import Quote from '../../views/Quote/Quote';
import Map from '../Map/Map';
import StatsList from '../StatsList/StatsList';
import Metadata from '../../views/Metadata/Metadata';

import './PostSection.css';

const sectiontypes = {
  heading: Heading,
  metadata: Metadata,
  lead: TextLead,
  text: TextPara,
  photo: Photo,
  map: Map,
  quote: Quote,
  statslist: StatsList
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
