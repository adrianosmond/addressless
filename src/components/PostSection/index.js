import React, { Component } from 'react';
import Heading from '../Heading';
import Metadata from '../Metadata';
import TextLead from '../TextLead';
import TextPara from '../TextPara';
import Photo from '../Photo';
import Quote from '../Quote';
import Map from '../Map';

import '../../assets/styles/objects/row.css';

class PostSection extends Component {
  inner () {
    if (this.props.sectiontype === 'lead') {
      return (
        <TextLead data={this.props.sectiondata} />
      );
    } else if (this.props.sectiontype === 'text') {
      return (
        <TextPara data={this.props.sectiondata} />
      );
    } else if (this.props.sectiontype === 'photo') {
      return (
        <Photo data={this.props.sectiondata} />
      );
    } else if (this.props.sectiontype === 'quote') {
      return (
        <Quote data={this.props.sectiondata} />
      );
    } else if (this.props.sectiontype === 'heading') {
      return (
        <Heading data={this.props.sectiondata} />
      );
    } else if (this.props.sectiontype === 'map') {
      return (
        <Map data={this.props.sectiondata} />
      );
    } else if (this.props.sectiontype === 'metadata') {
      return (
        <Metadata data={this.props.sectiondata} />
      );
    }
  }

  render () {
    if (this.props.sectiondata.fullWidth === true) {
      return this.inner();
    } else {
      return (
        <div className={'row' + ( this.props.sectiondata.color ? ' row--' + this.props.sectiondata.color : '' )}>
          <div className="row__inner">
            { this.inner() }
          </div>
        </div>
      );
    }
  }
}

export default PostSection;
