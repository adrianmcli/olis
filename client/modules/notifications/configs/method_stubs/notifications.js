import {check} from 'meteor/check';

export default function ({Meteor, Collections}) {
  const NOTIFICATIONS_REMOVE = 'notifications.remove';
  Meteor.methods({
    'notifications.remove'({convoId}) {
      check(arguments[0], {
        convoId: String
      });

      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error(NOTIFICATIONS_REMOVE, 'Must be logged in to remove notifications.');
      }
      const notif = Collections.Notifications.findOne({userId, convoId});
      if (!notif) {
        throw new Meteor.Error(NOTIFICATIONS_REMOVE, 'Must remove an existing notification.');
      }
      if (!notif.belongsToUser(userId)) {
        throw new Meteor.Error(NOTIFICATIONS_REMOVE, 'Can only remove notifications that belong to yourself.');
      }

      notif.remove();
    }
  });
}
