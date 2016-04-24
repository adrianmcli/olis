import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderNotifications from '../components/HeaderNotifications.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  clickNotification: actions.notifications.click
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter, LocalState} = context();

  function _getConvoId() {
    const windowIsFocused = LocalState.get('window.isFocused');
    const convoId = FlowRouter.getParam('convoId') ?
    FlowRouter.getParam('convoId') : undefined;

    if (!windowIsFocused) { return undefined; }
    return convoId;
  }

  const teamId = FlowRouter.getParam('teamId');
  const convoId = _getConvoId();
  if (teamId) {
    if (Meteor.subscribe('notifications.list', {teamId, convoId}).ready()) {
      const userId = Meteor.userId();
      const user = Meteor.user();
      const muteSound = user.muteNotificationSound ? user.muteNotificationSound : false;

      const selector = {
        userId,
        teamId,
        convoId: {$ne: convoId}
      };

      const notifications = Collections.Notifications.find(selector).fetch();
      onData(null, {
        notifications,
        muteSound
      });
    }
  }
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }), // Must be first in function call
  useDeps(depsMapper)
)(HeaderNotifications);
