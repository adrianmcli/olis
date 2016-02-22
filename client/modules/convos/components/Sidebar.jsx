import React from 'react';

import HeaderMenu from './HeaderMenu.jsx';
import HeaderNewConversation from './HeaderNewConversation.jsx';
import HeaderSearch from './HeaderSearch.jsx';
import HeaderNotifications from './HeaderNotifications.jsx';

import ConversationItem from './ConversationItem.jsx';

export default class Sidebar extends React.Component {
  render() {
    const {convos, selectConvo, convoId} = this.props;
    return (
      <div id="sidebar-container">
        <div id="sidebar-header">
          <HeaderMenu />
          <HeaderNewConversation />
          <HeaderSearch />
          <HeaderNotifications />
        </div>

        {/* Conversation List */}
        <div id="conversation-list">
          {convos.map(convo => {
            return (
              <ConversationItem
                key={convo._id}
                title={convo.name}
                timeString='34 minutes ago'
                previewText="Today's meeting minutes has been summarized into the notes on the side of this conversation."
                avatarSrc='http://www.placecage.com/200/200'
                unread={true}
                unreadCount={12}
                selectConvo={selectConvo.bind(null , convo._id)}
                active={convoId === convo._id}
              />
            );
          })}

        </div>
      </div>
    );
  }
}
