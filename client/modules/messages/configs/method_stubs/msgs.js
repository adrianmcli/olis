import {check} from 'meteor/check';
import R from 'ramda';

export default function ({Meteor, Collections}) {
  const MSGS_ADD = 'msgs.add';
  Meteor.methods({
    'msgs.add'({text, convoId}) {
      if (!Meteor.userId()) {
        throw new Meteor.Error(MSGS_ADD, 'Must be logged in to insert msgs.');
      }
      const convo = Collections.Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(MSGS_ADD, 'Must add msgs to an existing convo.');
      }
      if (!convo.isUserInConvo([ Meteor.userId() ])) {
        throw new Meteor.Error(MSGS_ADD, 'Must be a part of convo to add msgs');
      }

      check(arguments[0], {
        text: String,
        convoId: String
      });

      const msg = new Collections.Message();
      msg.set({text, convoId});
      msg.save();
    }
  });
}
