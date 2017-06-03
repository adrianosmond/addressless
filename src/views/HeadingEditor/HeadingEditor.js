import React from 'react';

const HeadingEditor = (props) => (
  <div>
    <label>
      Level:
      <select value={props.data.level} onChange={props.changeContents.bind(this, 'level')}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
    </label>
    <input type="text" className="post-section-editor__input" value={props.data.text} onChange={props.changeContents.bind(this, 'text')} />
  </div>
);

export default HeadingEditor;
