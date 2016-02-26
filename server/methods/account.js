import {Meteor} from 'meteor/meteor';
import {Convos, Teams, Messages} from '/lib/collections';
import Team from '/lib/team';
import {check, Match} from 'meteor/check';
import {Random} from 'meteor/random';
import {Roles} from 'meteor/alanning:roles';
import R from 'ramda';
import GetEmails from 'get-emails';

export default function () {
  const ACCOUNT_REGISTER = 'account.register';
  Meteor.methods({
    'account.register'({email, username, teamName, inviteEmails}) {
      check(arguments[0], {
        email: String,
        username: String,
        teamName: String,
        inviteEmails: Match.Optional([ String ])
      });
      Meteor.call(ACCOUNT_VALIDATE_EMAIL, {email});
      Meteor.call(ACCOUNT_VALIDATE_USERNAME, {username});
      Meteor.call(ACCOUNT_VALIDATE_TEAMNAME, {teamName});

      const password = Random.secret(15);
      const userId = Accounts.createUser({username, email, password});

      // Add users to team and set roles
      const team = new Team();
      team.set({
        name: teamName,
        userIds: [ userId ]
      });

      console.log('team');
      console.log(team);

      team.save();
      Roles.addUsersToRoles(userId, [ 'admin' ], team._id);
      Accounts.sendResetPasswordEmail(userId);

      // Create invite users and send invite emails
      if (inviteEmails && !R.isEmpty(inviteEmails)) {
        Meteor.call(ACCOUNT_CREATE_INVITE_USERS, {
          inviteEmails, invitedByName: username, invitedById: userId, teamId: team._id
        }, (err, res) => {});
      }

      return password;
    }
  });

  const ACCOUNT_CREATE_INVITE_USERS = 'account.createInviteUsers';
  Meteor.methods({
    'account.createInviteUsers'({inviteEmails, invitedByName, invitedById, teamId}) {
      check(arguments[0], {
        inviteEmails: [ String ],
        invitedByName: String,
        invitedById: String,
        teamId: String
      });

      const user = Meteor.users.findOne(invitedById);
      if (!user) {
        throw new Meteor.Error(ACCOUNT_CREATE_INVITE_USERS, 'Must be a registered user to invite other users.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(ACCOUNT_CREATE_INVITE_USERS, 'Must invite users to existing team.');
      }
      if (!team.isUserInTeam(invitedById)) {
        throw new Meteor.Error(ACCOUNT_CREATE_INVITE_USERS, 'Must be a member of team to invite new users to it.');
      }
      const filteredEmails = R.filter(email => GetEmails(email).length === 1, inviteEmails);
      if (R.isEmpty(filteredEmails)) {
        throw new Meteor.Error(ACCOUNT_CREATE_INVITE_USERS, 'Must provide proper invite emails.');
      }

      const invitedUserIds = filteredEmails.map(inviteEmail => {
        console.log(`inviteEmail ${inviteEmail}`);
        const invitedUserId = Accounts.createUser({email: inviteEmail});
        Meteor.users.update(invitedUserId, { $set: {invitedBy: invitedByName} });
        return invitedUserId;
      });

      team.set({userIds: [ ...team.userIds, ...invitedUserIds ]});
      team.save();
      Roles.addUsersToRoles(invitedUserIds, [ 'member' ], teamId);

      invitedUserIds.forEach(id => Accounts.sendEnrollmentEmail(id));
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

  const ACCOUNT_VALIDATE_EMAIL = 'account.validateEmail';
  Meteor.methods({
    'account.validateEmail'({email}) {
      check(arguments[0], {
        email: String
      });

      const emailTrim = email.trim();
      const emails = GetEmails(emailTrim);
      if (emails.length !== 1) {
        throw new Meteor.Error(ACCOUNT_VALIDATE_EMAIL, 'Please enter a proper email.');
      }
      const user = Accounts.findUserByEmail(emails[0]);
      if (user) {
        throw new Meteor.Error(ACCOUNT_VALIDATE_EMAIL, `The email ${emails[0]} is taken. Please enter another one.`);
      }
    }
  });

  const ACCOUNT_VALIDATE_USERNAME = 'account.validateUsername';
  Meteor.methods({
    'account.validateUsername'({username}) {
      check(arguments[0], {
        username: String
      });

      const nameTrim = username.trim();
      if (nameTrim === '') {
        throw new Meteor.Error(ACCOUNT_VALIDATE_USERNAME, 'Please enter a non-blank username.');
      }
      const user = Accounts.findUserByUsername(username);
      if (user) {
        throw new Meteor.Error(ACCOUNT_VALIDATE_USERNAME, `The username ${username} is taken. Please enter another one.`);
      }
    }
  });

  const ACCOUNT_VALIDATE_TEAMNAME = 'account.validateTeamName';
  Meteor.methods({
    'account.validateTeamName'({teamName}) {
      check(arguments[0], {
        teamName: String
      });

      const nameTrim = teamName.trim();
      if (nameTrim === '') {
        throw new Meteor.Error(ACCOUNT_VALIDATE_USERNAME, 'Please enter a non-blank username.');
      }
    }
  });

  const ACCOUNT_VALIDATE_PASSWORD = 'account.validatePassword';
  Meteor.methods({
    'account.validatePassword'({password}) {
      check(arguments[0], {
        password: String
      });

      const trimPwd = password.trim();
      if (trimPwd === '') {
        throw new Meteor.Error(ACCOUNT_VALIDATE_PASSWORD, 'Please enter a non-blank password.');
      }

      // Other things we want to validate...
    }
  });
}
