import React from 'react';

import HeaderEditInput from './HeaderEditInput';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.startEditing = () => this.setState({editing: true});
    this.stopEditing = () => this.setState({editing: false});
  }

  renderLabel() {
    const {prompt} = this.props;
    return (
      <div style={getStyles().prompt} onClick={this.startEditing}>
        {prompt}
      </div>
    );
  }

  renderEditing() {
    return (
      <HeaderEditInput
        prompt={this.props.prompt}
        stopEditing={this.stopEditing}
        updatePrompt={this.props.updatePrompt}
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
      padding: '8px 10px',
      border: 'none',
      outline: 'none',
      boxShadow: 'inset 0 -2px 1px rgba(0,0,0,0.03)',
      boxSizing: 'border-box',
    },
    prompt: {
      fontSize: '16px',
      fontWeight: '700',
      flexGrow: '1',
      cursor: 'pointer',
      lineHeight: '30px',
    },
  };
}
