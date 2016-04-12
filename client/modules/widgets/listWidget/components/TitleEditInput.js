import React from 'react';

export default class TitleEditInput extends React.Component {
  componentDidMount() {
    const {title} = this.props;
    this._input.value = title;
    this._input.select();
  }

  handleKeyDown(e) {
    const {updateTitle, stopEditing} = this.props;
    if (e.keyCode === 27) { // esc
      stopEditing();
      return;
    }
    if (e.keyCode === 13) { // enter
      const input = this._input.value;
      updateTitle(input.trim());
      stopEditing();
    }
  }

  render() {
    return (
      <input
        style={ getStyles() }
        onBlur={ this.props.stopEditing }
        onKeyDown={ this.handleKeyDown.bind(this) }
        ref={ x => this._input = x }
      />
    );
  }
}

function getStyles() {
  return {
    width: '100%',
    border: 'none',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '24px',
  };
}
