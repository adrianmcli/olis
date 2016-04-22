import React from 'react';

export default class HeaderEditInput extends React.Component {
  componentDidMount() {
    const {prompt} = this.props;
    this._input.value = prompt;
    this._input.select();
  }

  handleKeyDown(e) {
    const {stopEditing} = this.props;
    if (e.keyCode === 27) { // esc
      stopEditing();
      return;
    }
    if (e.keyCode === 13) { // enter
      this.updateAndClose();
    }
  }

  updateAndClose() {
    const {updatePrompt, stopEditing} = this.props;
    const input = this._input.value;
    updatePrompt(input.trim());
    stopEditing();
  }

  render() {
    return (
      <input
        style={ getStyles() }
        onBlur={ this.updateAndClose.bind(this) }
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
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '30px',
    fontFamily: 'inherit',
  };
}
