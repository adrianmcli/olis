import {Meteor} from 'meteor/meteor';
import {Notifications} from '/lib/collections';
import {check} from 'meteor/check';
import gcm from 'node-gcm';

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

  const SEND_GCM_MSG = 'notifications.send.GCMMsg';
  Meteor.methods({
    'notifications.send.GCMMsg'({sendToUserId}) {
      check(arguments[0], {
        sendToUserId: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(SEND_GCM_MSG, 'Must be logged in to notify others');
      }
      const user = Meteor.users.findOne(sendToUserId);
      const regToken = user.GCMToken.token;

      if (regToken) {
        const apiKey = Meteor.settings.GCM.server_api_key;

        let message = new gcm.Message();
        message.addData('key1', 'msg1');
        const regTokens = [ regToken ];

        // Set up the sender with you API key
        var sender = new gcm.Sender(apiKey);

        console.log(SEND_GCM_MSG);
        // Now the sender can be used to send messages
        sender.send(message, { registrationTokens: regTokens }, function (err, response) {
          if (err) { console.error(err); }
          else { console.log(response); }
        });
      }
    },
  });
}
