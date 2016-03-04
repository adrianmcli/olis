import {Meteor} from 'meteor/meteor';
import {Convos, Teams, Messages} from '/lib/collections';
import Team from '/lib/team';
import {check} from 'meteor/check';
import {Random} from 'meteor/random';
import {Roles} from 'meteor/alanning:roles';
import R from 'ramda';
import EmailValidator from 'email-validator';
import {Cloudinary} from 'meteor/lepozepo:cloudinary';

export default function () {
  const ACCOUNT_REGISTER = 'account.register';
  Meteor.methods({
    'account.register'({email, username, teamName}) {
      check(arguments[0], {
        email: String,
        username: String,
        teamName: String,
      });
      Meteor.call(ACCOUNT_VALIDATE_EMAIL, {email});
      Meteor.call(ACCOUNT_VALIDATE_USERNAME, {username});
      Meteor.call(ACCOUNT_VALIDATE_TEAMNAME, {teamName});

      const password = Random.secret(15);
      const userId = Accounts.createUser({username, email, password});
      Meteor.users.update(userId, { $set: {isRegistering: true} });

      // Add users to team and set roles
      const team = new Team();
      team.set({
        name: teamName,
        userIds: [ userId ]
      });
      team.save();
      Roles.addUsersToRoles(userId, [ 'admin' ], team._id);
      Accounts.sendResetPasswordEmail(userId);

      return {password, teamId: team._id};
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
      if (!EmailValidator.validate(email)) {
        throw new Meteor.Error(ACCOUNT_VALIDATE_EMAIL, 'Please enter a proper email.');
      }
      const user = Accounts.findUserByEmail(email);
      if (user) {
        throw new Meteor.Error(ACCOUNT_VALIDATE_EMAIL,
          `The email ${email} is taken. Please enter another one.`);
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
        throw new Meteor.Error(ACCOUNT_VALIDATE_USERNAME,
          'Please enter a non-blank username.');
      }
      const user = Accounts.findUserByUsername(username);
      if (user) {
        throw new Meteor.Error(ACCOUNT_VALIDATE_USERNAME,
          `The username ${username} is taken. Please enter another one.`);
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

  const ACCOUNT_PROFILE_PIC = 'account.addProfilePic';
  Meteor.methods({
    'account.addProfilePic'({cloudinaryPublicId}) {
      check(arguments[0], {
        cloudinaryPublicId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_PROFILE_PIC, 'Must be logged in to change profile picture.');
      }
      if (R.isEmpty(cloudinaryPublicId)) {
        throw new Meteor.Error(ACCOUNT_PROFILE_PIC,
          'cloudinaryPublicId cannot be an empty string.'
        );
      }

      Meteor.users.update(userId, {
        $set: {profileImageUrl: Cloudinary.url(cloudinaryPublicId)}
      });
    }
  });

  const ACCOUNT_FIND_MY_TEAM = 'account.findMyTeam';
  Meteor.methods({
    'account.findMyTeam'({email}) {
      check(arguments[0], {
        email: String
      });

      if (!EmailValidator.validate(email)) {
        throw new Meteor.Error(ACCOUNT_FIND_MY_TEAM, 'Enter a proper email.');
      }
      const existingUser = Accounts.findUserByEmail(email);
      if (!existingUser) {
        throw new Meteor.Error(ACCOUNT_FIND_MY_TEAM,
          `No teams found for ${email}. Create an account`);
      }

      Meteor.users.update(existingUser._id, {
        $set: {findingMyTeam: true}
      });
      Accounts.sendEnrollmentEmail(existingUser._id);
    }
  });
}
