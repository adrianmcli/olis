import React from 'react';

export default class TodoEditInput extends React.Component {
  getStyles() {
    return {
      container: {
        width: '100%',
      },
      input: {
        padding: '15px',
        marginLeft: '55px',
        width: 'calc(100% - 55px)',
        border: 'none',
        outline: 'none',
        boxSizing: 'border-box',
        fontSize: '16px',
      }
    };
  }

  componentDidMount() {
    const {text} = this.props.todo;
    this._input.value = text;
    this._input.focus();
  }

  handleKeyDown(e) {
    const {id} = this.props.todo;
    const {updateTask, cancelEditing} = this.props;

    const input = this._input.value;
    if (e.keyCode === 27) { // esc
      cancelEditing();
      return;
    }
    if (e.keyCode === 13) { // enter
      updateTask(id, input.trim());
      cancelEditing();
    }
  }

  render() {
    const {cancelEditing} = this.props;
    const styles = this.getStyles();

    return (
      <div style={styles.container}>
        <input
          style={styles.input}
          onBlur={cancelEditing}
          onKeyDown={this.handleKeyDown.bind(this)}
          ref={x => this._input = x}
        />
      </div>
    );
  }
}
