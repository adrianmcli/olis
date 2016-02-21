import {Convos, Messages} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  const MSGS_LIST = 'msgs.list';
  Meteor.publish(MSGS_LIST, function ({convoId}) {
    check(arguments[0], {
      convoId: String
    });

    if (!this.userId) {
      throw new Meteor.Error(MSGS_LIST, 'Must be logged in to get msgs list.');
    }
    const convo = Convos.findOne(convoId);
    if (!convo) {
      throw new Meteor.Error(MSGS_LIST, 'Can only retrieve messages from an existing convo.');
    }
    if (!convo.isUserInConvo(this.userId)) {
      throw new Meteor.Error(MSGS_LIST, 'Must be a member of convo to get convo\'s messages.');
    }

    return Messages.find({convoId});
  });
}
