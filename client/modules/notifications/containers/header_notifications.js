import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderNotifications from '../components/HeaderNotifications.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  clickNotification: actions.notifications.click
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  const teamId = FlowRouter.getParam('teamId');
  const convoId = FlowRouter.getParam('convoId') ? FlowRouter.getParam('convoId') : undefined;
  if (teamId) {
    if (Meteor.subscribe('notifications.list', {teamId, convoId}).ready()) {
      const userId = Meteor.userId();
      const notifications = Collections.Notifications.find({userId}).fetch();
      onData(null, {notifications});
    }
    else { onData(null, {notifications: []}); }
  }
  else { onData(null, {notifications: []}); }
};

export default composeAll(
  composeWithTracker(composer), // Must be first in function call
  useDeps(depsMapper)
)(HeaderNotifications);
