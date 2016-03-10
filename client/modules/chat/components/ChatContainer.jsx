import React from 'react';

import IconButton from 'material-ui/lib/icon-button';

import FilledStarIcon from 'material-ui/lib/svg-icons/toggle/star';
import EmptyStarIcon from 'material-ui/lib/svg-icons/toggle/star-border';

import ChatMembers from './ChatMenuItems/ChatMembers.jsx';
import ChatMenu from './ChatMenu.jsx';

import TextField from 'material-ui/lib/text-field';
import ChatMessageItem from './ChatMessageItem.jsx';

export default class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distanceFromBottom: 0,
      distanceFromTop: 0,
      chatMembersOpen: false,
    };
  }

  componentWillReceiveProps() {
    const ele = $(this._container);
    const distanceFromBottom = ele[0].scrollHeight - ele.scrollTop() - ele.outerHeight();
    const distanceFromTop = ele.scrollTop();
    this.setState({
      distanceFromBottom,
      distanceFromTop,
    });
  }

  componentDidUpdate() {
    const {distanceFromBottom, distanceFromTop} = this.state;
    const ele = $(this._container);
    const targetScrollTopValue = ele[0].scrollHeight - ele.outerHeight() - distanceFromBottom;
    if (distanceFromBottom === 0 || distanceFromTop === 0) {
      ele.scrollTop(targetScrollTopValue);  // set the scrollTop value
    }
  }

  handleEnterKeyDown(e) {
    const {addMsg} = this.props;
    if (e.shiftKey === true) {
      // shift key pressed, do nothing
    } else {
      e.preventDefault();
      const text = e.target.value;
      addMsg(text);
      e.target.value = '';
    }
  }

  openChatMembers() {this.setState({chatMembersOpen: true});}
  closeChatMembers() {this.setState({chatMembersOpen: false});}

  scrollToBottom() {
    const ele = $(this._container);
    ele.animate({ scrollTop: ele.prop('scrollHeight')}, 500);
  }

  render() {
    const {
      msgs,
      userId,
      convoUsers,
      title,
      usersListString,
      loadMore,
      starred,
    } = this.props;
    return (
      <div id="chat-container">
        <div id="chat-header">
          <div className="header-body" onClick={this.openChatMembers.bind(this)}>
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

        <div id="chat-msg-area" ref={(x) => this._container = x}>
          <div id="load-more-btn" onClick={loadMore}>Load more messages</div>
          {msgs.map(msg => {
            const otherUser = convoUsers[msg.userId];
            const authorName = otherUser.username;
            const avatarSrc = otherUser.profileImageUrl;
            return (
              <ChatMessageItem
                key={msg._id}
                authorName={authorName}
                avatarSrc={avatarSrc}
                content={msg.text}
                timestamp={msg.createdAt}
                selfAuthor={msg.userId === userId}
              />
            );
          })}
        </div>

        <div id="chat-input">
        <div className="chat-input-container">
          <TextField
            hintText="Type your message here"
            multiLine={true}
            rows={1}
            rowsMax={10}
            style={{transition: 'none', width: '90%', margin: '8px'}}
            onEnterKeyDown={this.handleEnterKeyDown.bind(this)}
          />
          </div>
        </div>

        <ChatMembers
          open={this.state.chatMembersOpen}
          onRequestClose={this.closeChatMembers.bind(this)}
        />
      </div>
    );
  }
}
ChatContainer.defaultProps = {
  title: 'Default title',
  usersListString: 'Default users list string',
  starred: false,
};
