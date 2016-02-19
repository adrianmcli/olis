import {Convos, Messages} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  const MSGS_LIST = 'msgs.list';
  Meteor.publish(MSGS_LIST, function ({convoId}) {
    if (!this.userId) {
      throw new Meteor.Error(MSGS_LIST, 'Must be logged in to get msgs list.');
    }
    check(arguments[0], {
      convoId: String
    });
    const convo = Convos.findOne(convoId);
    if (!convo) {
      throw new Meteor.Error(MSGS_LIST, 'User is not part of convo.');
    }
    return Messages.find({convoId});
  });
}
