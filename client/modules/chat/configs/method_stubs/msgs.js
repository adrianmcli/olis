import {check, Match} from 'meteor/check';
import DraftUtils from '/lib/utils/draft-js';

export default function ({Meteor, Collections, Schemas}) {
  const {Message} = Schemas;
  const {Convos} = Collections;

  Meteor.methods({
    'msgs.add.text'({text, convoId, isSystemMsg}) {
      check(arguments[0], {
        text: String,
        convoId: String,
        isSystemMsg: Match.Optional(Match.OneOf(undefined, null, Boolean)),
      });

      Meteor.call('msgs.add', {
        convoId,
        isSystemMsg,
        content: DraftUtils.getRawFromHTML(text),
        cloudinaryPublicId: undefined,
      });
    },
  });

  const MSGS_ADD = 'msgs.add';
  Meteor.methods({
    'msgs.add'({convoId, isSystemMsg, content, cloudinaryPublicId}) {
      check(arguments[0], {
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
        userId,
        username: user.displayName,
        convoId,
        convoName: convo.name,
        isSystemMsg,
        content,
      });
      msg.save();
    },
  });
}
