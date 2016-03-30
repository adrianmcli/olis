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
    const { avatar, name, email } = this.props;
    return (
      <ListItem
        leftAvatar={avatar}
        primaryText={name}
        secondaryText={email}
      />
    );
  }

  renderConvoItem() {
    const primaryText = makePrimaryText('Conversation', this.props.title);
    return (
      <ListItem
        leftAvatar={<Avatar icon={<ConvoIcon/>} backgroundColor={colors.blue300}/>}
        primaryText={primaryText}
      />
    );
  }

  renderNotesItem() {
    const primaryText = makePrimaryText('Notes', this.props.title);
    return (
      <ListItem
        leftAvatar={<Avatar icon={<NotesIcon/>} backgroundColor={colors.indigo300}/>}
        primaryText={primaryText}
      />
    );
  }

  renderMsgItem() {
    const { title, author, msg } = this.props;
    const primaryText = makePrimaryText('Message', `${author} in ${title}`);
    return (
      <ListItem
        leftAvatar={<Avatar icon={<MsgIcon />} backgroundColor={colors.purple900}/>}
        primaryText={primaryText}
        secondaryText={msg}
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

function makePrimaryText(strong, title) {
  return <div><strong>{strong}:</strong> {title}</div>;
}
