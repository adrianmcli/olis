import React from 'react';

import ListItem from 'material-ui/lib/lists/list-item';

import Avatar from 'material-ui/lib/avatar';
import NotesIcon from 'material-ui/lib/svg-icons/action/chrome-reader-mode';
import ConvoIcon from 'material-ui/lib/svg-icons/action/question-answer';
import MsgIcon from 'material-ui/lib/svg-icons/communication/chat';

import styles from 'material-ui/lib/styles';

const colors = styles.Colors;

export default class ResultItem extends React.Component {

  renderUserItem() {
    const { avatar, name } = this.props;
    return (
      <ListItem
        leftAvatar={avatar}
        primaryText={name}
      />
    );
  }

  renderConvoItem() {
    const primaryText = <div><strong>Conversation:</strong> {this.props.title}</div>;
    return (
      <ListItem
        leftAvatar={<Avatar icon={<ConvoIcon/>} backgroundColor={colors.blue300}/>}
        primaryText={primaryText}
      />
    );
  }

  renderNotesItem() {
    const primaryText = <div><strong>Notes:</strong> {this.props.title}</div>;
    return (
      <ListItem
        leftAvatar={<Avatar icon={<NotesIcon/>} backgroundColor={colors.indigo300}/>}
        primaryText={primaryText}
      />
    );
  }

  renderMsgItem() {
    const primaryText = <div><strong>Message:</strong> {this.props.title}</div>;
    const secondaryText = this.props.msg;
    return (
      <ListItem
        leftAvatar={<Avatar icon={<MsgIcon />} backgroundColor={colors.purple900}/>}
        primaryText={primaryText}
        secondaryText={secondaryText}
      />
    );
  }

  render() {
    switch (this.props.type) {
      case 'user':
        return this.renderUserItem.bind(this)();
      case 'convo':
        return this.renderConvoItem.bind(this)();
      case 'notes':
        return this.renderNotesItem.bind(this)();
      case 'msg':
        return this.renderMsgItem.bind(this)();
      default:
        return (
          <div>ERROR: The 'type' prop is not set.</div>
        );
    }
  }
}
