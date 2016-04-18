import React from 'react';

export default class ListInput extends React.Component {
  getStyles() {
    return {
      input: {
        // layout
        width: '100%',
        padding: '0 15px 15px 15px',
        border: 'none',
        outline: 'none',
        boxShadow: 'inset 0 -2px 1px rgba(0,0,0,0.03)',
        boxSizing: 'border-box',
        // typography
        fontSize: '16px',
        lineHeight: '1.2em',
      },
      dot: {
        height: '8px',
        width: '8px',
        backgroundColor: '#666',
        position: 'absolute',
        top: '5px',
        left: '16px',
        borderRadius: '6px',
      },
    };
  }

  // setFocus() {
  //   this._input.focus();
  // }

  handleKeyDown(e) {
    const {items} = this.props;
    const {addListItem, removeLastListItem} = this.props.actions;
    const input = this._input.value;
    if (e.keyCode === 13 && input.trim() !== '') {
      addListItem(input.trim());
      this._input.value = '';
    }
    if (e.keyCode === 8 && input === '') {
      if (items.length) {
        e.preventDefault();
        const text = items[items.length - 1].text;
        removeLastListItem();
        this._input.value = text;
      }
    }
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={{position: 'relative', paddingLeft: '24px'}}>
        <div style={styles.dot}/>
        <input
          style={styles.input}
          placeholder="Add another point"
          onKeyDown={this.handleKeyDown.bind(this)}
          ref={x => this._input = x}
        />
      </div>
    );
  }
}
