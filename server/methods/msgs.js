import {Meteor} from 'meteor/meteor';
import {Convos, Message} from '../../lib/collections';
import {check} from 'meteor/check';
import R from 'ramda';

export default function () {
  const MSGS_ADD = 'msgs.add';
  Meteor.methods({
    'msgs.add'({text, convoId}) {
      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(MSGS_ADD, 'Must be logged in to insert msgs.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo.isUserInConvo([ userId ])) {
        throw new Meteor.Error(MSGS_ADD, 'Must be a part of convo to add msgs');
      }

      check(arguments[0], {
        text: String,
        convoId: String
      });

      Meteor._sleepForMs(3000);

      const msg = new Message();
      msg.set({text, userId, convoId});
      msg.save();
      return msg; // Will return _id, and the server side only stuff too
    }
  });
}
