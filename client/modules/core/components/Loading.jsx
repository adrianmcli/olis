import React from 'react';

export default class Loading extends React.Component {

  renderFoldingCube() {
    return (
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    );
  }

  renderCubeGrid() {
    return (
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
    );
  }

  render() {
    const { spinnerName } = this.props;
    let result = null;

    switch (spinnerName) {
      case 'cube-grid':
        result = this.renderCubeGrid();
        break;
      case 'folding-cube':
        result = this.renderFoldingCube();
        break;
      default:
        result = this.renderCubeGrid();
    }

    return result;
  }
}
