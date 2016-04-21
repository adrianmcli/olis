import React from 'react';

import TitleEditInput from './TitleEditInput';

export default class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.startEditing = () => this.setState({editing: true});
    this.stopEditing = () => this.setState({editing: false});
  }

  renderLabel() {
    const {title} = this.props;
    return (
      <div style={getStyles().title} onClick={this.startEditing}>
        {title}
      </div>
    );
  }

  renderEditing() {
    return (
      <TitleEditInput
        title={this.props.title}
        stopEditing={this.stopEditing}
        updateTitle={this.props.updateTitle}
      />
    );
  }

  render() {
    const {editing} = this.state;
    return (
      <div style={getStyles().container}>
        { editing ? this.renderEditing() : this.renderLabel() }
      </div>
    );
  }
}

function getStyles() {
  return {
    container: {
      display: 'flex',
      width: '100%',
      padding: '8px 8px 8px 60px',
      border: 'none',
      outline: 'none',
      boxShadow: 'inset 0 -2px 1px rgba(0,0,0,0.03)',
      boxSizing: 'border-box',
    },
    title: {
      fontSize: '16px',
      fontWeight: '700',
      flexGrow: '1',
      cursor: 'pointer',
      lineHeight: '30px',
    },
  };
}
