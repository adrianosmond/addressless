import React from 'react';

const QuoteEditor = (props) => (
  <textarea className="post-section-editor__textarea" value={props.data.text} onChange={props.changeContents.bind(this, 'text')}></textarea>
);

export default QuoteEditor;
