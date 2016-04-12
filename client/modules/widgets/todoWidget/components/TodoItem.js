import React from 'react';

import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import RemoveIcon from 'material-ui/lib/svg-icons/content/clear';

import TodoEditInput from './TodoEditInput';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      editing: false,
    };
  }

  getStyles() {
    return {
      item: {
        position: 'relative',
        fontSize: '24px',
        borderBottom: '1px solid #ededed',
      },
      view: {
        display: 'flex',
      },
      contentContainer: {
        display: 'flex',
        width: '100%',
      },
      checkbox: {
        width: '55px',
        display: 'flex',
        alignItems: 'center',
        left: '20px',
        boxSizing: 'border-box',
      },
      label: {
        whiteSpace: 'pre-line',
        wordBreak: 'break-all',
        padding: '15px',
        display: 'block',
        lineHeight: '1.2',
        transition: 'color 0.4s',
        fontSize: '16px',
      },
      removeBtn: {
        marginLeft: 'auto',
      },
    };
  }

  handleMouseEnter() {
    this.setState({hovering: true});
  }

  handleMouseLeave() {
    this.setState({hovering: false});
  }

  renderItemContent() {
    const {id, text, completed} = this.props.todo;
    const {removeTask, toggleTask} = this.props.actions;
    const styles = this.getStyles();

    const labelText = completed ? <s>{text}</s> : text;
    const labelStyle = completed ? Object.assign(styles.label, {opacity: '0.3'}) : styles.label;
    const handleDoubleClick = () => this.setState({editing: true});

    return (
      <div style={styles.contentContainer}>
        <Checkbox
          checked={completed}
          style={styles.checkbox}
          onClick={toggleTask.bind(null, id)}
        />
        <label style={labelStyle} onDoubleClick={handleDoubleClick}>{labelText}</label>
        {
          this.state.hovering ?
            <IconButton
              onClick={removeTask.bind(null, id)}
              tooltip="Remove Task"
              style={styles.removeBtn}
            >
              <RemoveIcon />
            </IconButton>
          : null    // eslint-disable-line operator-linebreak
        }
      </div>
    );
  }

  renderEditing() {
    const {todo} = this.props;
    const {updateTask} = this.props.actions;
    const cancelEditing = () => this.setState({editing: false});
    return (
      <TodoEditInput
        todo={todo}
        updateTask={updateTask}
        cancelEditing={cancelEditing}
      />
    );
  }

  render() {
    const {editing} = this.state;
    const styles = this.getStyles();

    return (
      <li
        style={styles.item}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <div style={styles.view}>
          { editing ? this.renderEditing() : this.renderItemContent() }
        </div>
      </li>
    );
  }
}
