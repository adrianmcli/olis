import {Meteor} from 'meteor/meteor';
import Convos from '/lib/schemas/convo';
import Message from '/lib/schemas/msg';
import Notification from '/lib/schemas/notification';
import {Messages, Notifications} from '/lib/collections';
import {check, Match} from 'meteor/check';
import R from 'ramda';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';
import DraftUtils from '/lib/utils/draft-js';

export default function () {
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

      const transform = {
        // width: 100,
        // height: 100,
        quality: 80,
        sign_url: true,
      };

      const msg = new Message();
      msg.set({
        userId,
        username: user.displayName,
        convoId,
        convoName: convo.name,
        isSystemMsg,
        content,
        imageUrl: Cloudinary.url(cloudinaryPublicId, transform), // SERVER ONLY
      });
      msg.save();
    },
  });
}
