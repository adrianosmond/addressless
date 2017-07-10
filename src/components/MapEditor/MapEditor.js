import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadRouteList } from '../../actions/routeList';

class MapEditor extends Component {
  componentWillMount() {
    this.props.loadRoutes();
  }
  render () {
    return (
      <div>
        <label style={{display: 'block'}}>
          Map Type:
          <select value={this.props.data.mapType} onChange={this.props.changeContents.bind(this, 'mapType')}>
            <option value='terrain'>Terrain</option>
            <option value='styled'>Styled</option>
          </select>
        </label>
        <label style={{display: 'block'}}>
          Route:
          { this.props.isLoading ? ' Loading ' :
            <select value={this.props.data.mapRoute} onChange={this.props.changeContents.bind(this, 'mapRoute')}>
              <option value=''>None</option>
              {this.props.routes ? Object.keys(this.props.routes).map((routeId) => {
                return (
                  <option key={routeId} value={this.props.routes[routeId].url}>{this.props.routes[routeId].title}</option>
                );
              }) : null }
            </select>
          }
        </label>
        <label>
          NW Latitude:
          <input type="text" className="post-section-editor__input" value={this.props.data.nwlat} onChange={this.props.changeContents.bind(this, 'nwlat')} />
        </label>
        <label>
          NW Longitude:
          <input type="text" className="post-section-editor__input" value={this.props.data.nwlng} onChange={this.props.changeContents.bind(this, 'nwlng')} />
        </label>
        <label>
          SE Latitude:
          <input type="text" className="post-section-editor__input" value={this.props.data.selat} onChange={this.props.changeContents.bind(this, 'selat')} />
        </label>
        <label>
          SE Longitude:
          <input type="text" className="post-section-editor__input" value={this.props.data.selng} onChange={this.props.changeContents.bind(this, 'selng')} />
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    routes: state.routeList,
    isLoading: state.routeListIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRoutes: () => dispatch(loadRouteList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapEditor);
