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
      windowIsFocused,
    } = this.props;
    return (
      <GeminiScrollbar>
      <FlipMove>
        {convos.map(convo => {
          const unreadCount = getUnreadMsgsCount(convoId, convo, windowIsFocused, lastTimeInConvo);
          const unread = unreadCount > 0;

          const title = getTitle(convo, teamUsersArr, user);
          const lastUser = getLastUser(convo, user, teamUsers);
          const lastUsername = getLastUsername(lastUser, user, convo);
          const avatarSrc = lastUser ? lastUser.profileImageUrl : undefined;

          return (
            <ConversationItem
              key={convo._id}
              convoId={convo._id}
              title={title}
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
    const emptyState = <div className="empty-state">No Chats Found</div>;
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

function getUnreadMsgsCount(convoId, convo, windowIsFocused, lastTimeInConvo) {
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
  return unreadCount;
}

function getLastUser(convo, user, teamUsers) {
  const otherRecentUserIds = convo.recentUserIds.length > 1 ?
    R.filter(id => id !== user._id, convo.recentUserIds) : [ user._id ]; // Show yourself if you are the only one in convo
  const lastUserId = R.last(otherRecentUserIds);
  const lastUser = teamUsers[lastUserId];
  return lastUser;
}

function getLastUsername(lastUser, user, convo) {
  let lastUsername;
  if (!lastUser) {
    const otherRecentUsernames = R.filter(name => name !== user.displayName,
      convo.recentUsernames);
    lastUsername = R.last(otherRecentUsernames);
  }
  else { lastUsername = lastUser.displayName; }
  return lastUsername;
}

function getTitle(convo, teamUsersArr, user) {
  // No idea why R.filter doesn't work on an object, even tho it worked on Ramda's website test.
  const convoUsersArr = R.filter(teamUser => R.contains(teamUser._id, convo.userIds), teamUsersArr);
  const convoUsers = R.zipObj(convoUsersArr.map(convoUser => convoUser._id), convoUsersArr);
  const title = convo.getName(user._id, convoUsers);
  return title;
}
