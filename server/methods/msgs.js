import {Meteor} from 'meteor/meteor';
import Convos from '/lib/convo';
import Message from '/lib/msg';
import Notification from '/lib/notification';
import {Messages, Notifications} from '/lib/collections';
import {check} from 'meteor/check';
import R from 'ramda';

export default function () {
  const MSGS_ADD = 'msgs.add';
  Meteor.methods({
    'msgs.add'({text, convoId}) {
      check(arguments[0], {
        text: String,
        convoId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(MSGS_ADD, 'Must be logged in to insert msgs.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(MSGS_ADD, 'Must post messages to an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(MSGS_ADD, 'Must be a part of convo to add msgs');
      }

      const msg = new Message();
      msg.set({text, userId, convoId});
      msg.save();

      // Update convo with last msg text
      convo.set({
        lastMsgText: text,
        numMsgs: Messages.find({convoId}).count()
      });
      convo.save();

      // Notify convo users, other than yourself, SERVER ONLY
      const otherUserIds = R.filter(otherId => otherId !== userId, convo.userIds);
      const username = Meteor.users.findOne(userId).username;

      otherUserIds.map(otherId => {
        const oldNotif = Notifications.findOne({
          userId: otherId,
          teamId: convo.teamId,
          convoId: convo._id
        });
        if (!oldNotif) {
          const notif = new Notification();
          notif.set({
            userId: otherId,
            teamId: convo.teamId,
            convoId: convo._id,
            convoName: convo.name,
            recentUsernames: [ username ]
          });
          notif.save();
        }
        else {
          console.log('oldNotif');
          console.log(oldNotif);
          const oldRecentUsernames = oldNotif.recentUsernames;
          const recentUsernames = R.uniq([ ...oldRecentUsernames, username ]);
          oldNotif.set({recentUsernames});
          oldNotif.save();
        }
      });

      return msg; // Will return _id, and the server side only stuff too
    }
  });
}
