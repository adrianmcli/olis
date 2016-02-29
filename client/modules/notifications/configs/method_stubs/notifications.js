import {check} from 'meteor/check';

export default function ({Meteor, Collections}) {
  const NOTIFICATIONS_REMOVE = 'notifications.remove';
  Meteor.methods({
    'notifications.remove'({notifId}) {
      check(arguments[0], {
        notifId: String
      });

      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error(NOTIFICATIONS_REMOVE, 'Must be logged in to remove notifications.');
      }
      const notif = Collections.Notifications.findOne({_id: notifId});
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
