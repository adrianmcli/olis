import {Teams, Convos, Messages} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import R from 'ramda';

export default function () {
  const MSGS_LIST = 'msgs.list';
  const NUM_MSG_INTERVAL = 10;
  Meteor.publish(MSGS_LIST, function ({convoId, currentNumMsgs}) {
    check(arguments[0], {
      convoId: String,
      currentNumMsgs: Number
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
    const team = Teams.findOne(convo.teamId);
    if (!team) {
      throw new Meteor.Error(MSGS_LIST, 'Can only get messages from an existing team.');
    }
    if (!team.isUserInTeam(this.userId)) {
      throw new Meteor.Error(MSGS_LIST, 'Must be a member of convo\'s team to get msgs.');
    }

    const selector = {convoId};
    const optionsLimit = {
      sort: [ [ 'createdAt', 'desc' ] ],
      limit: currentNumMsgs + NUM_MSG_INTERVAL
    };
    const msgs = Messages.find(selector, optionsLimit).fetch();
    const oldestDate = !R.isEmpty(msgs) ? R.last(msgs).createdAt : new Date(0);

    // Selected by timestamp to prevent new msgs pushing previously seen msgs out
    // when newly created msgs come in
    const selectorTime = {convoId, createdAt: {$gte: oldestDate}};
    let options = { sort: [ [ 'createdAt', 'asc' ] ] };

    const othersFields = {
      username: 1,
      roles: 1
    };

    return [
      Messages.find(selectorTime, options),
      Meteor.users.find({_id: {$in: convo.userIds}}, {fields: othersFields})
    ];
  });
}
