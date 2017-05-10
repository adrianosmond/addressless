import React, { Component } from 'react';

class HeadingEditor extends Component {
  render () {
    return (
      <div>
        <label>
          Level:
          <select value={this.props.data.level}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </label>
        <input type="text" className="post-section-editor__input" value={this.props.data.text} />
      </div>
    );
  }
}

export default HeadingEditor;
