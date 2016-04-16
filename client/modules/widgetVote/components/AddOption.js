import React from 'react';

export default class AddOption extends React.Component {
  handleKeyDown(e) {
    const {createOption} = this.props;
    const input = this._input.value.trim();
    if (e.keyCode === 13 && input !== '') { // enter
      createOption(input);
      this._input.value = '';
    }
  }

  render() {
    const styles = getStyles();
    return (
      <div style={ styles.container }>
        <input
          style={ styles.input }
          placeholder='Add an option (press Enter to submit)'
          onKeyDown={ this.handleKeyDown.bind(this) }
          ref={ x => this._input = x }
        />
      </div>
    );
  }
}

function getStyles() {
  return {
    container: {
      display: 'flex',
      position: 'relative',
      borderBottom: '1px solid #ededed',
      boxSizing: 'border-box',
    },
    input: {
      padding: '14px',
      fontSize: '18px',
      width: '100%',
      border: 'none',
      outline: 'none',
    }
  };
}
