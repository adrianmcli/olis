import React from 'react';

export default class OptionEditInput extends React.Component {
  componentDidMount() {
    const {label} = this.props.option;
    this._input.value = label;
    this._input.focus();
  }

  handleKeyDown(e) {
    const {id} = this.props.option;
    const {updateOptionLabel, stopEditing} = this.props;

    const input = this._input.value.trim();
    if (e.keyCode === 27) { // esc
      stopEditing();
      return;
    }
    if (e.keyCode === 13) { // enter
      if (input !== '') {updateOptionLabel(id, input);}
      stopEditing();
    }
  }

  render() {
    const {stopEditing} = this.props;
    const styles = getStyles();

    return (
      <div style={styles.container}>
        <input
          style={styles.input}
          onBlur={stopEditing}
          onKeyDown={this.handleKeyDown.bind(this)}
          ref={x => this._input = x}
        />
      </div>
    );
  }
}

function getStyles() {
  return {
    container: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'white',
      zIndex: '3',
      margin: '-15px'
    },
    input: {
      padding: '15px',
      width: '100%',
      border: 'none',
      outline: 'none',
      boxSizing: 'border-box',
      fontSize: '16px',
    }
  };
}
