import React from 'react';

import ListItem from 'material-ui/lib/lists/list-item';

import Avatar from 'material-ui/lib/avatar';
import NotesIcon from 'material-ui/lib/svg-icons/action/chrome-reader-mode';
import ConvoIcon from 'material-ui/lib/svg-icons/action/question-answer';
import MsgIcon from 'material-ui/lib/svg-icons/communication/chat';

import styles from 'material-ui/lib/styles';

const colors = styles.Colors;

export default class ResultItem extends React.Component {
  handleClick(onClick) {
    const {closeModal} = this.props;
    closeModal();
    onClick();
  }

  renderUserItem() {
    const { avatar, name, email, onClick } = this.props;
    return (
      <ListItem
        leftAvatar={avatar}
        primaryText={name}
        secondaryText={email}
        onTouchTap={this.handleClick.bind(this, onClick)}
      />
    );
  }

  renderConvoItem() {
    const {title, onClick} = this.props;
    const primaryText = makePrimaryText('Conversation', title);
    return (
      <ListItem
        leftAvatar={<Avatar icon={<ConvoIcon/>} backgroundColor={colors.blue300}/>}
        primaryText={primaryText}
        onTouchTap={this.handleClick.bind(this, onClick)}
      />
    );
  }

  renderNotesItem() {
    const {title, onClick} = this.props;
    const primaryText = makePrimaryText('Notes', title);
    return (
      <ListItem
        leftAvatar={<Avatar icon={<NotesIcon/>} backgroundColor={colors.indigo300}/>}
        primaryText={primaryText}
        onTouchTap={this.handleClick.bind(this, onClick)}
      />
    );
  }

  renderMsgItem() {
    const { title, author, msg, onClick } = this.props;
    const primaryText = makePrimaryText('Message', `${author} in ${title}`);
    return (
      <ListItem
        leftAvatar={<Avatar icon={<MsgIcon />} backgroundColor={colors.purple900}/>}
        primaryText={primaryText}
        secondaryText={msg}
        onTouchTap={this.handleClick.bind(this, onClick)}
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
ResultItem.defaultProps = {
  onClick() { console.log('result item clicked.'); },
  title: 'Convo name',
  author: 'Default author',
  msg: 'Default msg text',
  name: 'Default username',
  email: 'Default email'
};


function makePrimaryText(strong, title) {
  return <div><strong>{strong}:</strong> {title}</div>;
}
