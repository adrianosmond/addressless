import React, { Component } from 'react';

class Heading extends Component {
  render () {
    const HeadingTag = `h${this.props.data.level}`;

    return (
      <HeadingTag>{this.props.data.text}</HeadingTag>
    );
  }
}

export default Heading;
