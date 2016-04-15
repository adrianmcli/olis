import {Meteor} from 'meteor/meteor';
import {Convos, Message, Notification} from '/lib/schemas';
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
      const user = Meteor.users.findOne(userId);

      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(MSGS_ADD, 'Must post messages to an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(MSGS_ADD, 'Must be a part of convo to add msgs');
      }

      const msg = new Message();
      msg.set({text, userId, username: user.username, convoId, convoName: convo.name});
      msg.save();

      // Update convo with last msg text
      const uniqueRecentUserIds = R.uniq(convo.recentUserIds);
      const oldRecentUserIds = uniqueRecentUserIds.length >= 2 ?
        R.takeLast(2, uniqueRecentUserIds) : R.takeLast(2, convo.userIds);

      const recentUserIds = R.takeLast(2, R.uniq([ ...oldRecentUserIds, userId ]));
      const recentUsers = Meteor.users.find({_id: {$in: recentUserIds}});
      const recentUsernames = recentUsers.map(recentUser => recentUser.username);

      const getConvoFields = () => {
        const baseFields = {
          lastMsgText: text,
          lastMsgCreatedAt: msg.createdAt,
          recentUserIds,
          recentUsernames,
          numMsgs: Messages.find({convoId}).count() // SERVER ONLY
        };

        if (Messages.find({convoId}).count() === 1) {
          const firstMsgCreatedAt = msg.createdAt;
          return R.merge(baseFields, {firstMsgCreatedAt});
        }
        return baseFields;
      };

      convo.set(getConvoFields());
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
            recentUsernames: [ username ],
            lastProfileImageUrl: user.profileImageUrl
          });
          notif.save();
        }
        else {
          const oldRecentUsernames = oldNotif.recentUsernames;
          const notifRecentUsernames = R.uniq([ ...oldRecentUsernames, username ]);
          oldNotif.set({
            recentUsernames: notifRecentUsernames,
            lastProfileImageUrl: user.profileImageUrl
          });
          oldNotif.save();
        }
      });

      return msg; // Will return _id, and the server side only stuff too
    }
  });
}
