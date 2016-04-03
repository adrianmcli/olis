import React from 'react';
import _ from 'lodash';
import R from 'ramda';

import HeaderMenu from '../containers/header_menu';
import HeaderNewConversation from '../containers/header_new_conversation';
import HeaderSearch from '/client/modules/search/containers/search_team';
import HeaderNotifications from '/client/modules/notifications/containers/header_notifications';

import FlipMove from 'react-flip-move';
import GeminiScrollbar from 'react-gemini-scrollbar';
import ConversationItem from './ConversationItem.jsx';

export default class Sidebar extends React.Component {

  renderConversations() {
    const {
      convos, selectConvo, convoId,
      lastTimeInConvo, teamUsers, user, teamUsersArr,
      windowIsFocused
    } = this.props;
    return (
      <GeminiScrollbar>
      <FlipMove>
        {convos.map(convo => {
          const otherRecentUserIds = convo.recentUserIds.length > 1 ?
            R.filter(id => id !== user._id, convo.recentUserIds) : [ user._id ]; // Show yourself if you are the only one in convo
          const lastUserId = R.last(otherRecentUserIds);
          const lastUser = teamUsers[lastUserId];
          const avatarSrc = lastUser ? lastUser.profileImageUrl : undefined;

          let lastUsername;
          if (!lastUser) {
            const otherRecentUsernames = R.filter(name => name !== user.username,
              convo.recentUsernames);
            lastUsername = R.last(otherRecentUsernames);
          }
          else { lastUsername = lastUser.username; }

          let unread = false;
          let unreadCount = 0;
          if (convoId === convo._id && windowIsFocused) {
            unreadCount = 0;
          }
          else {
            if (convo.numMsgs && !_.has(lastTimeInConvo, `${convo._id}.numMsgs`)) {
              unreadCount = convo.numMsgs;
            }
            else if (convo.numMsgs && _.has(lastTimeInConvo, `${convo._id}.numMsgs`)) {
              unreadCount = convo.numMsgs - lastTimeInConvo[convo._id].numMsgs;
            }
          }
          unread = unreadCount > 0;

          // No idea why R.filter doesn't work on an object, even tho it worked on Ramda's website test.
          const convoUsersArr = R.filter(teamUser => R.contains(teamUser._id, convo.userIds), teamUsersArr);
          const convoUsers = R.zipObj(convoUsersArr.map(convoUser => convoUser._id), convoUsersArr);

          return (
            <ConversationItem
              key={convo._id}
              convoId={convo._id}
              title={convo.getName(user._id, convoUsers)}
              lastUpdated={convo.updatedAt}
              previewText={convo.lastMsgText}
              username={lastUsername}
              avatarSrc={avatarSrc}
              unread={unread}
              unreadCount={unreadCount}
              selectConvo={selectConvo.bind(null , convo._id)}
              active={convoId === convo._id}
            />
          );
        })}
      </FlipMove>
      </GeminiScrollbar>
    );
  }

  render() {
    const { convos } = this.props;
    const emptyState = <div className="empty-state">No Conversations Found</div>;
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
          { convos.length === 0 ? emptyState : this.renderConversations.bind(this)()}
        </div>
      </div>
    );
  }
}
