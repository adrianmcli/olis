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
    if (title === '') {
      return (
        <div style={getStyles().placeholder} onClick={this.startEditing}>
        Title (Meeting Minutes, Notes, Takeaways)
        </div>
      );
    }
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
      fontSize: '16px',
      flexGrow: '1',
      cursor: 'pointer',
      lineHeight: '30px',
    },
    placeholder: {
      fontSize: '16px',
      flexGrow: '1',
      cursor: 'pointer',
      lineHeight: '30px',
      fontStyle: 'italic',
      fontWeight: '300',
      color: '#e6e6e6',
    },
    input: {
      width: '100%',
      border: 'none',
      outline: 'none',
      boxSizing: 'border-box',
      fontSize: '16px',
    },
  };
}
