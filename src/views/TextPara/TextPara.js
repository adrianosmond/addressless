import React from 'react';

const TextPara = (props) => (
  <div>
    {props.data.text.split('\n\n').map((para, idx) => {
      if (para.length === 0) {
        return '';
      } else {
        return (
          <p key={idx}>{para}</p>
        );
      }
    })}
  </div>
);

export default TextPara;
