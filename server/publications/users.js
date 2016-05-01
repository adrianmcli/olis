import {Meteor} from 'meteor/meteor';
import {Convos, Teams} from '/lib/collections';
import {check} from 'meteor/check';
import R from 'ramda';

export const othersFields = {
  displayName: 1,
  emails: 1,
  profileImageUrl: 1,
  description: 1,
};

const selfFields = R.merge(othersFields, {
  lastTimeInConvo: 1,
  lastTimeInTeam: 1,
  translationLangCode: 1,
  muteNotificationSound: 1,
});

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
    return Meteor.users.find(null, {fields: othersFields});
  });

  const USERS_TEAM = 'users.team';
  Meteor.publish(USERS_TEAM, function ({teamId}) {
    check(arguments[0], {
      teamId: String,
    });

    if (!this.userId) {
      throw new Meteor.Error(USERS_TEAM, 'Must be logged in to get team users list.');
    }
    const team = Teams.findOne(teamId);
    if (!team) {
      throw new Meteor.Error(USERS_TEAM, 'Must get users from an existing team.');
    }
    if (!team.isUserInTeam(this.userId)) {
      throw new Meteor.Error(USERS_TEAM, 'Must be a part of team to get team users list.');
    }

    const fields = R.merge(othersFields, {
      [`roles.${teamId}`]: 1,
    });
    const selector = {
      [`roles.${teamId}`]: {$exists: true},
    };
    return Meteor.users.find(selector, {fields});
  });

  const USERS_CONVO = 'users.convo';
  Meteor.publish(USERS_CONVO, function ({convoId}) {
    check(arguments[0], {
      convoId: String,
    });

    if (!this.userId) {
      throw new Meteor.Error(USERS_CONVO, 'Must be logged in to get convo users list.');
    }
    const convo = Convos.findOne(convoId);
    if (!convo) {
      throw new Meteor.Error(USERS_CONVO, 'Must get users from an existing convo.');
    }
    if (!convo.isUserInConvo(this.userId)) {
      throw new Meteor.Error(USERS_CONVO, 'Must be a part of convo to get users list.');
    }
    const teamId = convo.teamId;
    const team = Teams.findOne(teamId);
    if (!team) {
      throw new Meteor.Error(USERS_CONVO, 'Must get users from an existing team.');
    }
    if (!team.isUserInTeam(this.userId)) {
      throw new Meteor.Error(USERS_CONVO, 'Must be a part of team to get users list.');
    }

    const selector = {
      _id: { $in: convo.userIds },
    };
    const options = {
      fields: R.merge(othersFields, {
        [`roles.${teamId}`]: 1,
      }),
    };
    return Meteor.users.find(selector, options);
  });
}
