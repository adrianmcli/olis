import React from 'react';

export default class Loading extends React.Component {

  renderFoldingCube() {
    return (
      <div className="sk-folding-cube" style={this.props.style}>
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    );
  }

  renderCubeGrid() {
    const { color } = this.props;
    return (
      <div className="sk-cube-grid" style={this.props.style}>
        <div className="sk-cube sk-cube1" style={{backgroundColor: color}}></div>
        <div className="sk-cube sk-cube2" style={{backgroundColor: color}}></div>
        <div className="sk-cube sk-cube3" style={{backgroundColor: color}}></div>
        <div className="sk-cube sk-cube4" style={{backgroundColor: color}}></div>
        <div className="sk-cube sk-cube5" style={{backgroundColor: color}}></div>
        <div className="sk-cube sk-cube6" style={{backgroundColor: color}}></div>
        <div className="sk-cube sk-cube7" style={{backgroundColor: color}}></div>
        <div className="sk-cube sk-cube8" style={{backgroundColor: color}}></div>
        <div className="sk-cube sk-cube9" style={{backgroundColor: color}}></div>
      </div>
    );
  }

  render() {
    const { spinnerName } = this.props;
    let result = null;

    switch (spinnerName) {
      case 'cube-grid':
        result = this.renderCubeGrid.bind(this)();
        break;
      case 'folding-cube':
        result = this.renderFoldingCube.bind(this)();
        break;
      default:
        result = this.renderCubeGrid.bind(this)();
    }

    return result;
  }
}
