import {check, Match} from 'meteor/check';
import R from 'ramda';
import DraftUtils from '/lib/utils/draft-js';

export default function ({Meteor, Collections, Schemas}) {
  const {Message} = Schemas;
  const {Messages, Convos} = Collections;

  const MSGS_ADD = 'msgs.add';
  Meteor.methods({
    'msgs.add'({text, convoId, isSystemMsg, content, cloudinaryPublicId}) {
      check(arguments[0], {
        text: String,
        convoId: String,
        isSystemMsg: Match.Optional(Match.OneOf(undefined, null, Boolean)),
        content: Match.Optional(Match.OneOf(undefined, null, Object)),
        cloudinaryPublicId: Match.Optional(Match.OneOf(undefined, null, String)),
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
        username: user.displayName,
        convoId,
        convoName: convo.name,
        isSystemMsg,
        content,
      });
      msg.save();

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
        else if (hasContent) { lastMsgText = DraftUtils.getPlainTextFromRaw(msg.content); }

        const baseFields = {
          lastMsgText,
          lastMsgCreatedAt: msg.createdAt,
          recentUserIds,
          recentUsernames,
        };

        if (Messages.find({convoId}).count() === 1) {
          const firstMsgCreatedAt = msg.createdAt;
          return R.merge(baseFields, {firstMsgCreatedAt});
        }
        return baseFields;
      };

      convo.set(getConvoFields());
      convo.save();
    },
  });
}
