import React, { Component } from 'react';
import HeadingEditor from '../../views/HeadingEditor/HeadingEditor';
import TextLeadEditor from '../../views/TextLeadEditor/TextLeadEditor';
import TextParaEditor from '../../views/TextParaEditor/TextParaEditor';
import PhotoEditor from '../../components/PhotoEditor/PhotoEditor';
import QuoteEditor from '../../views/QuoteEditor/QuoteEditor';
import MapEditor from '../../views/MapEditor/MapEditor';

import './PostSectionEditor.css';

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
        <label>
          Section colour:
          <select value={this.props.sectiondata.color || 'none'} onChange={this.props.changeSectionColor}>
            <option>none</option>
            <option>dark</option>
          </select>
        </label>
        <button disabled={!this.props.canGoUp} onClick={this.props.moveUp}>&uarr;</button>
        <button disabled={!this.props.canGoDown} onClick={this.props.moveDown}>&darr;</button>
        <button onClick={this.props.deleteSection}>Delete section</button>
        <label><input type="checkbox" onChange={this.props.toggleFullWidth} checked={this.props.sectiondata.fullWidth || false} /> Full width</label>
        { this.inner(this.props.sectiontype, this.props.sectiondata) }
      </div>
    );
  }
}

export default PostSectionEditor;
