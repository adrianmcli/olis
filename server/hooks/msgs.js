import { Meteor } from 'meteor/meteor';
import R from 'ramda';
import { Messages, Convos, Notifications } from '/lib/collections';
import Notification from '/lib/schemas/notification';

export default function () {
  Messages.after.insert(function (_userId, doc) {
    // doc is a msg json obj, but not the Astro obj, so convert to one
    const msg = Messages.findOne(doc._id);
    const userId = msg.userId;  // In case of insert on behalf of super user in shadow team.

    const convo = Convos.findOne(msg.convoId);
    const convoId = convo._id;

    // Update convo with last msg text
    const uniqueRecentUserIds = R.uniq(convo.recentUserIds);
    const oldRecentUserIds = uniqueRecentUserIds.length >= 2 ?
      R.takeLast(2, uniqueRecentUserIds) : R.takeLast(2, convo.userIds);

    const recentUserIds = R.takeLast(2, R.uniq([ ...oldRecentUserIds, userId ]));
    const recentUsers = Meteor.users.find({_id: {$in: recentUserIds}});
    const recentUsernames = recentUsers.map(recentUser => recentUser.displayName);

    const getConvoFields = () => {
      const hasImage = msg.imageUrl ? true : false;
      const hasContent = R.keys(msg.content).length > 0;

      let lastMsgText = '';
      if (hasImage) { lastMsgText = msg.imageUrl; }
      else if (hasContent) { lastMsgText = msg.text; }

      const baseFields = {
        lastMsgText,
        lastMsgCreatedAt: msg.createdAt,
        recentUserIds,
        recentUsernames,
        lastUserId: msg.userId,
        lastUsername: msg.username,
        numMsgs: Messages.find({convoId}).count(), // SERVER ONLY
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
    const user = Meteor.users.findOne(userId);
    const username = user.displayName;

    otherUserIds.map(otherId => {
      const oldNotif = Notifications.findOne({
        userId: otherId,
        teamId: convo.teamId,
        convoId: convo._id,
      });
      if (!oldNotif) {
        const notif = new Notification();
        notif.set({
          userId: otherId,
          teamId: convo.teamId,
          convoId: convo._id,
          convoName: convo.name,
          recentUsernames: [ username ],
          lastProfileImageUrl: user.profileImageUrl,
        });
        notif.save();
      }
      else {
        const oldRecentUsernames = oldNotif.recentUsernames;
        const notifRecentUsernames = R.uniq([ ...oldRecentUsernames, username ]);
        oldNotif.set({
          recentUsernames: notifRecentUsernames,
          lastProfileImageUrl: user.profileImageUrl,
        });
        oldNotif.save();
      }
    });
  });
}
