import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import IconButton from 'material-ui/lib/icon-button';

import FilledStarIcon from 'material-ui/lib/svg-icons/toggle/star';
import EmptyStarIcon from 'material-ui/lib/svg-icons/toggle/star-border';

import ChangeConvoName from '../containers/change_convo_name';
import ChatMenu from './ChatMenu.jsx';

export default class ChatHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMembersOpen: false,
      changeTitleOpen: false
    };
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  openChatMembers() {this.setState({chatMembersOpen: true});}
  closeChatMembers() {this.setState({chatMembersOpen: false});}

  openChangeTitle() {this.setState({changeTitleOpen: true});}
  closeChangeTitle() {this.setState({changeTitleOpen: false});}

  render() {
    const {
      title,
      usersListString,
      starred
    } = this.props;

    return (
      <div id="chat-header">
        <div className="header-body" onTouchTap={this.openChangeTitle.bind(this)}>
          <ChangeConvoName
            open={this.state.changeTitleOpen}
            onRequestClose={this.closeChangeTitle.bind(this)}
          />

          <div className="chat-title">
            {title}
          </div>
          <div className="chat-meta">
            {usersListString}
          </div>
        </div>
        <div className="header-icon">
          <IconButton tooltip="Star this conversation">
            { starred ? <FilledStarIcon color="#FFC107"/> : <EmptyStarIcon color="#FFC107"/> }
          </IconButton>
        </div>
        <div className="header-icon">
          <ChatMenu />
        </div>
      </div>
    );
  }
}
ChatHeader.defaultProps = {
  title: 'Default title',
  usersListString: 'Default users list string',
  starred: false,
};
