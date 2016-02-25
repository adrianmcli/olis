import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import TextField from 'material-ui/lib/text-field';
import ChatMessageItem from './ChatMessageItem.jsx';

export default class ChatContainer extends React.Component {
  handleEnterKeyDown(e) {
    const {addMsg} = this.props;
    if (e.shiftKey === true) {
      console.log('shift-key has been pressed');
    } else {
      e.preventDefault();
      const text = e.target.value;
      addMsg(text);
      e.target.value = '';
    }
  }

  render() {
    const {msgs, userId, convoUsers, title, usersListString, loadMore} = this.props;
    return (
      <div id="chat-container">
        <div id="chat-header">
          <div className="header-body">
            <div className="chat-title">
              {title}
            </div>
            <div className="chat-meta">
              {usersListString}
            </div>
          </div>
          <div className="header-icon">
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Add people to chat" />
              <MenuItem primaryText="Change chat title" />
              <MenuItem primaryText="Chat info" />
            </IconMenu>
          </div>
        </div>

        <div id="chat-msg-area">
          <button onClick={loadMore}>Load more messages</button>
          {msgs.map(msg => {
            return (
              <ChatMessageItem
                key={msg._id}
                authorName={convoUsers[msg.userId].username}
                avatarSrc='http://www.placecage.com/200/200'
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
      </div>
    );
  }
}
ChatContainer.defaultProps = {
  title: 'Default title',
  usersListString: 'Default users list string'
};

