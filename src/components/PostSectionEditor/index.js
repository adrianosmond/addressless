import React, { Component } from 'react';
import HeadingEditor from '../HeadingEditor';
import TextLeadEditor from '../TextLeadEditor';
import TextParaEditor from '../TextParaEditor';
import PhotoEditor from '../PhotoEditor';
import QuoteEditor from '../QuoteEditor';
import MapEditor from '../MapEditor';

import './index.css';

const sectiontypes = {
  heading: HeadingEditor,
  lead: TextLeadEditor,
  text: TextParaEditor,
  photo: PhotoEditor,
  map: MapEditor,
  quote: QuoteEditor,
}

class PostSectionEditor extends Component {
  inner (type, data) {
    const SectionTag = sectiontypes[type];
    return (
      <SectionTag data={data} changeContents={this.props.changeContents} />
    );
  }

  render () {
    return (
      <div className="post-section-editor">
        <label>
          Section type:
          <select value={this.props.sectiontype} onChange={this.props.changeSectionType}>
            {Object.keys(sectiontypes).map((type) => {
              return (
                <option key={type} value={type}>{type}</option>
              );
            })}
          </select>
        </label>
        <button disabled={!this.props.canGoUp} onClick={this.props.moveUp}>&uarr;</button>
        <button disabled={!this.props.canGoDown} onClick={this.props.moveDown}>&darr;</button>
        <button onClick={this.props.deleteSection}>Delete section</button>
        { this.inner(this.props.sectiontype, this.props.sectiondata) }
      </div>
    );
  }
}

export default PostSectionEditor;
