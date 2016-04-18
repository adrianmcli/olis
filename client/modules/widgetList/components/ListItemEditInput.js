import React from 'react';
import Textarea from 'react-textarea-autosize';

export default class ListItemEditInput extends React.Component {
  getStyles() {
    return {
      container: {
        width: '100%',
      },
      input: {
        width: '100%',
        border: 'none',
        outline: 'none',
        boxSizing: 'border-box',
        whiteSpace: 'pre-line',
        wordBreak: 'break-all',
        padding: '0 15px 15px',
        display: 'block',
        lineHeight: '1.2',
        transition: 'color 0.4s',
        fontSize: '16px',
        resize: 'none',
      }
    };
  }

  componentDidMount() {
    const {text} = this.props.item;
    this._input.value = text;
    this._input.focus();
  }

  handleKeyDown(e) {
    const {id} = this.props.item;
    const {updateListItem, cancelEditing, removeListItem} = this.props;

    const input = this._input.value;
    if (e.keyCode === 27) { // esc
      cancelEditing();
      return;
    }
    if (e.keyCode === 13) { // enter
      updateListItem(id, input.trim());
      cancelEditing();
    }
    if (e.keyCode === 8) {  // backspace
      if (input === '') {
        e.preventDefault();
        removeListItem(id);
      }
    }
  }

  render() {
    const {cancelEditing} = this.props;
    const styles = this.getStyles();

    return (
      <div style={styles.container}>
        <Textarea
          style={styles.input}
          onBlur={cancelEditing}
          onKeyDown={this.handleKeyDown.bind(this)}
          ref={x => this._input = x}
        />
      </div>
    );
  }
}
