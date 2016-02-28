import React from 'react';
import _ from 'lodash';

import HeaderMenu from './HeaderMenu.jsx';
import HeaderNewConversation from './HeaderNewConversation.jsx';
import HeaderSearch from './HeaderSearch.jsx';
import HeaderNotifications from './HeaderNotifications.jsx';

import ConversationItem from './ConversationItem.jsx';

export default class Sidebar extends React.Component {
  render() {
    const {convos, selectConvo, convoId, addConvo,
      lastTimeInConvo, teamSearchResultUsers, searchTeamUsers,
      teamName, username, logout} = this.props;
    return (
      <div id="sidebar-container">
        <div id="sidebar-header">
          <HeaderMenu teamName={teamName} username={username} logout={logout} />
          <HeaderNewConversation
            teamSearchResultUsers={teamSearchResultUsers}
            addConvo={addConvo}
            searchTeamUsers={searchTeamUsers}
          />
          <HeaderSearch />
          <HeaderNotifications />
        </div>

        {/* Conversation List */}
        <div id="conversation-list">
          {convos.map(convo => {

            let unread = true;
            let unreadCount = 0;
            if (convoId === convo._id) {
              unread = false;
              unreadCount = 0;
            }
            else {
              unreadCount = convo.numMsgs && _.has(lastTimeInConvo, `${convo._id}.numMsgs`) ?
                Math.max(convo.numMsgs - lastTimeInConvo[convo._id].numMsgs, 0) : 0;
              unread = unreadCount > 0;
            }
            return (
              <ConversationItem
                key={convo._id}
                title={convo.name}
                lastUpdated={convo.updatedAt}
                previewText={convo.lastMsgText}
                avatarSrc='http://www.placecage.com/200/200'
                unread={unread}
                unreadCount={unreadCount}
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
