import {Meteor} from 'meteor/meteor';
import {Convos} from '/lib/collections';
import {check} from 'meteor/check';

const selfFields = {
  lastTimeInConvo: 1
};

const othersFields = {
  username: 1,
  email: 1,
  roles: 1
};

export default function () {
  const SELF = 'self';
  Meteor.publish(null, function () {
    if (!this.userId) {
      throw new Meteor.Error(SELF, 'Must be logged in to get self data.');
    }

    return Meteor.users.find(this.userId, {fields: selfFields});
  });

  const USERS_LIST = 'users.list';
  Meteor.publish(USERS_LIST, function () {
    if (!this.userId) {
      throw new Meteor.Error(USERS_LIST, 'Must be logged in to get users list.');
    }
    return Meteor.users.find(null, {othersFields});
  });

  const USERS_CONVO = 'users.convo';
  Meteor.publish(USERS_CONVO, function ({convoId}) {
    check(arguments[0], {
      convoId: String
    });

    if (!this.userId) {
      throw new Meteor.Error(USERS_CONVO, 'Must be logged in to get convo users list.');
    }
    const convo = Convos.findOne(convoId);
    if (!convo) {
      throw new Meteor.Error(USERS_CONVO, 'Must be a part of convo to get convo users list.');
    }

    return Meteor.users.find({
      _id: {$in: convo.userIds}
    }, {fields: othersFields});
  });
}
