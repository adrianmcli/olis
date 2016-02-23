import {check} from 'meteor/check';

export default function ({Meteor, Collections, Models}) {
  const MSGS_ADD = 'msgs.add';
  Meteor.methods({
    'msgs.add'({text, convoId}) {
      check(arguments[0], {
        text: String,
        convoId: String
      });

      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error(MSGS_ADD, 'Must be logged in to insert msgs.');
      }
      const convo = Collections.Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(MSGS_ADD, 'Must post messages to an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(MSGS_ADD, 'Must be a part of convo to add msgs');
      }

      const msg = new Models.Message();
      msg.set({text, userId, convoId});
      msg.save();

      // Update convo with last msg text
      convo.set({
        lastMsgText: text
      });
      convo.save();
    }
  });
}
