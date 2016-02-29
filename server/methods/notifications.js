import {Meteor} from 'meteor/meteor';
import {Notifications} from '/lib/collections';
import {check} from 'meteor/check';

export default function () {
  const NOTIFICATIONS_REMOVE = 'notifications.remove';
  Meteor.methods({
    'notifications.remove'({convoId}) {
      check(arguments[0], {
        convoId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(NOTIFICATIONS_REMOVE, 'Must be logged in to remove notifications.');
      }
      const notif = Notifications.findOne({userId, convoId});
      if (notif) {
        if (!notif.belongsToUser(userId)) {
          throw new Meteor.Error(NOTIFICATIONS_REMOVE, 'Can only remove notifications that belong to yourself.');
        }
        else { notif.remove(); }
      }
    }
  });
}
