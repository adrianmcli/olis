import {Meteor} from 'meteor/meteor';
import {Convos, Teams, Messages} from '/lib/collections';
import {check} from 'meteor/check';
import R from 'ramda';

export default function () {
  const ACCOUNT_REGISTER = 'account.register';
  Meteor.methods({
    'account.register'({email, username, password}) {
      check(arguments[0], {
        email: String,
        username: String,
        password: String
      });
      if (email === '') {
        throw new Meteor.Error(ACCOUNT_REGISTER, 'Enter a non-empty email.');
      }
      if (username === '') {
        throw new Meteor.Error(ACCOUNT_REGISTER, 'Enter a non-empty username.');
      }
      if (password === '') {
        throw new Meteor.Error(ACCOUNT_REGISTER, 'Enter a non-empty password.');
      }

      Accounts.createUser({username, email, password});
    }
  });

  const ACCOUNT_LAST_TIME_CONVO = 'account.setLastTimeInConvo';
  Meteor.methods({
    'account.setLastTimeInConvo'({convoId}) {
      check(arguments[0], {
        convoId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must be logged in to set last time in convo.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must set last time in an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must be member of convo to set last time in it.');
      }

      let setObj = {};
      setObj[`lastTimeInConvo.${convoId}`] = {
        timestamp: new Date(),
        numMsgs: Messages.find({convoId}).count()
      };
      const modifier = { $set: setObj };
      Meteor.users.update(userId, modifier);
    }
  });

  const ACCOUNT_LAST_TIME_TEAM = 'account.setLastTimeInTeam';
  Meteor.methods({
    'account.setLastTimeInTeam'({teamId}) {
      check(arguments[0], {
        teamId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_TEAM, 'Must be logged in to set last time in team.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_TEAM, 'Must set last time in an existing team.');
      }
      if (!team.isUserInTeam(userId)) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_TEAM, 'Must be member of team to set last time in it.');
      }

      let setObj = {};
      setObj[`lastTimeInTeam.${teamId}`] = new Date();
      const modifier = { $set: setObj };
      Meteor.users.update(userId, modifier);
    }
  });
}
