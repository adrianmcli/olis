import {check, Match} from 'meteor/check';
import R from 'ramda';

export default function ({Meteor, Collections, Schemas}) {
  const {Message} = Schemas;
  const {Messages, Convos} = Collections;

  const MSGS_ADD = 'msgs.add';
  Meteor.methods({
    'msgs.add'({text, convoId, isSystemMsg}) {
      check(arguments[0], {
        text: String,
        convoId: String,
        isSystemMsg: Match.Optional(Match.OneOf(undefined, null, Boolean))
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
      msg.set({
        text,
        userId,
        username: user.username,
        convoId,
        convoName: convo.name,
        isSystemMsg
      });
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

    }
  });
}
