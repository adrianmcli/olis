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
      padding: '15px',
      border: 'none',
      outline: 'none',
      boxSizing: 'border-box',
    },
    title: {
      fontSize: '24px',
      flexGrow: '1',
      cursor: 'pointer',
      lineHeight: '30px',
    },
    input: {
      width: '100%',
      border: 'none',
      outline: 'none',
      boxSizing: 'border-box',
      fontSize: '24px',
    },
  };
}
