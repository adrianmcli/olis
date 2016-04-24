import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import RemoveIcon from 'material-ui/lib/svg-icons/content/clear';

import ListItemEditInput from './ListItemEditInput';

export default class ListItem extends React.Component {
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
      },
      view: {
        display: 'flex',
        paddingLeft: '24px',
        position: 'relative',
      },
      contentContainer: {
        display: 'flex',
        width: '100%',
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
      text: {
        whiteSpace: 'pre-line',
        wordBreak: 'break-all',
        padding: '0 15px 15px',
        display: 'block',
        lineHeight: '1.2em',
        transition: 'color 0.4s',
        fontSize: '16px',
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
    const {id, text} = this.props.item;
    const styles = this.getStyles();

    const handleDoubleClick = () => this.setState({editing: true});

    return (
      <div style={styles.text} onDoubleClick={handleDoubleClick}>{text}</div>
    );
  }

  renderEditing() {
    const {item} = this.props;
    const {updateListItem, removeListItem} = this.props.actions;
    const cancelEditing = () => this.setState({editing: false});
    return (
      <ListItemEditInput
        item={item}
        updateListItem={updateListItem}
        cancelEditing={cancelEditing}
        removeListItem={removeListItem}
      />
    );
  }

  render() {
    const {editing} = this.state;
    const styles = this.getStyles();

    return (
      <div
        style={styles.item}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <div style={styles.view}>
          <div style={styles.dot}/>
          { editing ? this.renderEditing() : this.renderItemContent() }
        </div>
      </div>
    );
  }
}
