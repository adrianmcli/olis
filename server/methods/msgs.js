import {Meteor} from 'meteor/meteor';
import Convos from '/lib/convo';
import Message from '/lib/msg';
import {check} from 'meteor/check';

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
        lastMsgText: text
      });
      convo.save();

      return msg; // Will return _id, and the server side only stuff too
    }
  });
}
