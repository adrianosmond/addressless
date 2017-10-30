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
          <select value={this.props.data.mapStyle} onChange={this.props.changeContents.bind(this, 'mapStyle')}>
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
