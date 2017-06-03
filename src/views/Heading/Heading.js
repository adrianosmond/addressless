import React from 'react';

const Heading = (props) => {
  const HeadingTag = `h${props.data.level}`;
  return (
    <HeadingTag>{props.data.text}</HeadingTag>
  );
}

export default Heading;
