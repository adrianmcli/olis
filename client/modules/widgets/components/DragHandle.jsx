import React, { Component } from 'react';

export default class DragHandle extends Component {
  render() {
    const handleStyle = {
      width: '1rem',
      height: '1rem',
      display: 'inline-block',
      marginRight: '6px',
      cursor: 'move'
    };

    return (
      <div style={handleStyle}>
        <svg height="26" width="24">
          <g fill="#EEE">
            <circle cx="4.5" cy="5" r="2.5" />
            <circle cx="12" cy="5" r="2.5" />
            <circle cx="4.5" cy="14" r="2.5" />
            <circle cx="12" cy="14" r="2.5" />
            <circle cx="4.5" cy="23" r="2.5" />
            <circle cx="12" cy="23" r="2.5" />
          </g>
        </svg>
      </div>
    );
  }
}
