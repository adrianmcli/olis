import {Meteor} from 'meteor/meteor';
import {Notifications} from '/lib/collections';
import {check} from 'meteor/check';

export default function () {
  const REMOVE = 'notifications.remove';
  Meteor.methods({
    'notifications.remove'({convoId}) {
      check(arguments[0], {
        convoId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(REMOVE, 'Must be logged in to remove notifications.');
      }
      const notif = Notifications.findOne({userId, convoId});
      if (notif) {
        if (!notif.belongsToUser(userId)) {
          throw new Meteor.Error(REMOVE, 'Can only remove notifications that belong to yourself.');
        }
        else { notif.remove(); }
      }
    },
  });

  const SET_GCM_TOKEN = 'notifications.set.GCMToken';
  Meteor.methods({
    'notifications.set.GCMToken'({token}) {
      check(arguments[0], {
        token: Object,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(SET_GCM_TOKEN, 'Must be logged in to set GCM token.');
      }

      Meteor.users.update(userId, {
        $set: { GCMToken: token},
      });
      console.log(`${userId} GCMToken`);
      console.log(token);
    },
  });
}
