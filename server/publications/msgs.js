import {Mongo} from 'meteor/mongo';
import {Teams, Convos, Messages} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import R from 'ramda';
import {PUBLISH_INTERVAL} from '/lib/constants/msgs';

const othersFields = {
  username: 1,
  roles: 1
};

export default function () {
  const MSGS_LIST = 'msgs.list';
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
      limit: currentNumMsgs + PUBLISH_INTERVAL
    };
    const msgs = Messages.find(selector, optionsLimit).fetch();
    const oldestDate = !R.isEmpty(msgs) ? R.last(msgs).createdAt : new Date(0);

    // Selected by timestamp to prevent new msgs pushing previously seen msgs out
    // when newly created msgs come in
    const selectorTime = {convoId, createdAt: {$gte: oldestDate}};
    let options = { sort: [ [ 'createdAt', 'asc' ] ] };

    return [
      Messages.find(selectorTime, options),
      Meteor.users.find({_id: {$in: convo.userIds}}, {fields: othersFields})
    ];
  });

  const MSGS_SEARCH_RESULT_OLDER = 'msgs.searchResult';
  Meteor.publish(MSGS_SEARCH_RESULT_OLDER, function ({msgId, oldestMsgId, newestMsgId}) {
    check(arguments[0], {
      msgId: String,
      oldestMsgId: Match.Optional(Match.OneOf(undefined, null, String)),
      newestMsgId: Match.Optional(Match.OneOf(undefined, null, String))
    });

    const userId = this.userId;
    if (!userId) {

    }
    const msg = Messages.findOne(msgId);
    if (!msg) {

    }
    const convoId = msg.convoId;
    const convo = Convos.findOne(convoId);
    if (!convo) {

    }
    if (!convo.isUserInConvo) {

    }
    const team = Teams.findOne(convo.teamId);
    if (!team) {

    }
    if (!team.isUserInTeam(this.userId)) {

    }
    if (oldestMsgId) {
      if (!Messages.findOne(oldestMsgId)) {

      }
    }

    function _getOldestDate() {
      const _getSelector = () => {
        if (!oldestMsgId) { return {convoId, createdAt: {$lte: msg.createdAt}}; }

        const oldestMsg = Messages.findOne(oldestMsgId);
        return {convoId, createdAt: {$lte: oldestMsg.createdAt}};
      };

      const options = {
        sort: [ [ 'createdAt', 'desc' ] ],
        limit: PUBLISH_INTERVAL
      };

      const msgs = Messages.find(_getSelector(), options).fetch();
      return !R.isEmpty(msgs) ? R.last(msgs).createdAt : new Date(0);
    }

    function _getNewestDate() {
      const _getSelector = () => {
        if (!newestMsgId) { return {convoId: msg.convoId, createdAt: {$gte: msg.createdAt}}; }

        const newestMsg = Messages.findOne(newestMsgId);
        return {convoId, createdAt: {$gte: newestMsg.createdAt}};
      };
      const options = {
        sort: [ [ 'createdAt', 'asc' ] ],
        limit: PUBLISH_INTERVAL
      };

      const msgs = Messages.find(_getSelector(), options).fetch();
      return !R.isEmpty(msgs) ? R.last(msgs).createdAt : new Date(0);
    }

    // Publish older msgs using time threshold
    let optionsAsc = { sort: [ [ 'createdAt', 'asc' ] ] };
    const selectorTimeOld = {
      convoId,
      createdAt: {$gte: _getOldestDate(), $lte: msg.createdAt}
    };
    Mongo.Collection._publishCursor(
      Messages.find(selectorTimeOld, optionsAsc), this, 'searchMessages');

    // Publish newer msgs using time threshold
    const selectorTimeNew = {
      convoId,
      createdAt: {$lte: _getNewestDate(), $gte: msg.createdAt}
    };
    Mongo.Collection._publishCursor(
      Messages.find(selectorTimeNew, optionsAsc), this, 'searchMessages');

    // Users
    const userSelector = {_id: {$in: convo.userIds}};
    const userOptions = {fields: othersFields};
    Mongo.Collection._publishCursor(Meteor.users.find(userSelector, userOptions), this, 'users');

    this.ready();
  });
}
