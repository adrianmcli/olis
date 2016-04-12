import React, { Component } from 'react';

export default class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  getIcon() {
    const {icon, active} = this.props;
    const Icon = icon;
    return active ? <Icon color="#0074D9" /> : <Icon color="#AAA"/>;
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    const buttonStyle = {
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
    };
    return (
      <span
        className={className}
        onMouseDown={this.onToggle}
        style={buttonStyle}
      >
        {this.getIcon()}
      </span>
    );
  }
}
