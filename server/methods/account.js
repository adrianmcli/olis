import { Meteor } from 'meteor/meteor';
import { Convos, Teams, Messages } from '/lib/collections';
import { Accounts } from 'meteor/accounts-base';
import Team from '/lib/schemas/team';
import Convo from '/lib/schemas/convo';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { Roles } from 'meteor/alanning:roles';
import R from 'ramda';
import EmailValidator from 'email-validator';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';

export default function () {
  const ACCOUNT_REGISTER_TEAM = 'account.register.createTeam';
  Meteor.methods({
    'account.register.createTeam'({teamName}) {
      check(arguments[0], {
        teamName: String,
      });

      // Account creation called from client side, so user is logged in already.
      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_REGISTER_TEAM, 'Must be logged in to create team.');
      }

      // Add users to team and set roles
      const team = new Team();
      team.set({
        name: teamName,
        userIds: [ userId ],
      });
      team.save();
      Roles.addUsersToRoles(userId, [ 'admin' ], team._id);

      return {teamId: team._id};
    },
  });

  const ACCOUNT_REGISTER_TEAM_CONVO = 'account.register.createTeamAndConvo';
  Meteor.methods({
    'account.register.createTeamAndConvo'({teamName}) {
      check(arguments[0], {
        teamName: String,
      });

      // Account creation called from client side, so user is logged in already.
      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_REGISTER_TEAM_CONVO, 'Must be logged in to create team and convo.');
      }
      Meteor.call('account.setTranslationLanguage', {langCode: 'en'});

      // Add users to team and set roles
      const team = new Team();
      team.set({
        name: teamName,
        userIds: [ userId ],
      });
      team.save();
      Roles.addUsersToRoles(userId, [ 'admin' ], team._id);

      const convoId = Meteor.call('convos.add', {
        name: 'Your first chat!',
        userIds: [ userId ],
        teamId: team._id}
      );

      return {teamId: team._id, convoId};
    },
  });

  const ACCOUNT_REGISTER_NO_PWD = 'account.register.noPassword';
  Meteor.methods({
    'account.register.noPassword'({email, username, teamName}) {
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
        userIds: [ userId ],
      });
      team.save();
      Roles.addUsersToRoles(userId, [ 'admin' ], team._id);
      Accounts.sendResetPasswordEmail(userId);

      return {password, teamId: team._id};
    },
  });

  const ACCOUNT_LAST_TIME_CONVO = 'account.setLastTimeInConvo';
  Meteor.methods({
    'account.setLastTimeInConvo'({convoId}) {
      check(arguments[0], {
        convoId: String,
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
        numMsgs: Messages.find({convoId}).count(),
      };
      const modifier = { $set: setObj };
      Meteor.users.update(userId, modifier);
    },
  });

  const ACCOUNT_LAST_TIME_TEAM = 'account.setLastTimeInTeam';
  Meteor.methods({
    'account.setLastTimeInTeam'({teamId}) {
      check(arguments[0], {
        teamId: String,
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
    },
  });

  Meteor.methods({
    'account.validateEmails'({emails}) {
      check(arguments[0], {
        emails: [ String ],
      });

      emails.forEach(email => Meteor.call('account.validateEmail', { email }));
    },
  });

  const ACCOUNT_VALIDATE_EMAIL = 'account.validateEmail';
  Meteor.methods({
    'account.validateEmail'({email}) {
      check(arguments[0], {
        email: String,
      });
      if (!EmailValidator.validate(email)) {
        throw new Meteor.Error(ACCOUNT_VALIDATE_EMAIL, `${email} is not a proper email.`);
      }
      const user = Accounts.findUserByEmail(email);
      if (user) {
        throw new Meteor.Error(ACCOUNT_VALIDATE_EMAIL,
          `The email ${email} is taken. Please enter another one.`);
      }

      Meteor.call('register.isEmailOnWhitelist', {email});
    },
  });

  const ACCOUNT_VALIDATE_USERNAME = 'account.validateUsername';
  Meteor.methods({
    'account.validateUsername'({username}) {
      check(arguments[0], {
        username: String,
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
    },
  });

  const ACCOUNT_VALIDATE_TEAMNAME = 'account.validateTeamName';
  Meteor.methods({
    'account.validateTeamName'({teamName}) {
      check(arguments[0], {
        teamName: String,
      });

      const nameTrim = teamName.trim();
      if (nameTrim === '') {
        throw new Meteor.Error(ACCOUNT_VALIDATE_USERNAME, 'Please enter a non-blank username.');
      }
    },
  });

  const ACCOUNT_VALIDATE_PASSWORD = 'account.validatePassword';
  Meteor.methods({
    'account.validatePassword'({password}) {
      check(arguments[0], {
        password: String,
      });

      const trimPwd = password.trim();
      if (trimPwd === '') {
        throw new Meteor.Error(ACCOUNT_VALIDATE_PASSWORD, 'Please enter a non-blank password.');
      }

      // Other things we want to validate...
    },
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
        $set: {findingMyTeam: true},
      });
      Accounts.sendEnrollmentEmail(existingUser._id);
    },
  });

  const ACCOUNT_PROFILE_PIC = 'account.addProfilePic';
  Meteor.methods({
    'account.addProfilePic'({cloudinaryPublicId}) {
      check(arguments[0], {
        cloudinaryPublicId: String,
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

      const transform = {
        width: 100,
        height: 100,
        quality: 80,
        sign_url: true,
      };
      Meteor.users.update(userId, {
        $set: {profileImageUrl: Cloudinary.url(cloudinaryPublicId, transform)},
      });
    },
  });

  const ACCOUNT_SET_EMAIL = 'account.setEmail';
  Meteor.methods({
    'account.setEmail'({email}) {
      check(arguments[0], {
        email: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_SET_EMAIL, 'Must be logged in to change email.');
      }
      const user = Meteor.users.findOne(userId);
      Meteor.call('account.validateEmail', {email});
      Accounts.removeEmail(userId, user.emails[0].address);
      Accounts.addEmail(userId, email); // This does not check for proper email form, only existence in DB
    },
  });

  const ACCOUNT_SET_TRANSLATION_LANG = 'account.setTranslationLanguage';
  Meteor.methods({
    'account.setTranslationLanguage'({langCode}) {
      check(arguments[0], {
        langCode: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_SET_TRANSLATION_LANG,
          'Must be logged in to change translation language.');
      }
      Meteor.users.update(userId, {
        $set: {translationLangCode: langCode},
      });
    },
  });

  const ACCOUNT_SET_MUTE_NOTIFICATION_SOUND = 'account.setMuteNotificationSound';
  Meteor.methods({
    'account.setMuteNotificationSound'({mute}) {
      check(arguments[0], {
        mute: Boolean,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_SET_MUTE_NOTIFICATION_SOUND, 'Must be logged in to toggle notification sound.');
      }

      Meteor.users.update(userId, {
        $set: { muteNotificationSound: mute},
      });
    },
  });

  // SERVER ONLY
  const ACCOUNT_REMOVE_FROM_TEAM = 'account.removeFromTeam';
  Meteor.methods({
    'account.removeFromTeam'({removeUserId, teamId}) {
      check(arguments[0], {
        removeUserId: String,
        teamId: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_REMOVE_FROM_TEAM, 'Must be logged in to remove user from team.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(ACCOUNT_REMOVE_FROM_TEAM, 'Must remove user from existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(ACCOUNT_REMOVE_FROM_TEAM, 'Must be an admin to remove user from team.');
      }

      const convos = Convos.find({teamId}).fetch();
      const convoIdsToUnset = convos.reduce((prev, curr) => {
        const convo = {
          [`lastTimeInConvo.${curr._id}`]: '',
        };
        return R.merge(prev, convo);
      }, {});

      const unsetObj = R.merge({
        [`roles.${teamId}`]: '',
        [`lastTimeInTeam.${teamId}`]: '',
      }, convoIdsToUnset);

      Meteor.users.update(removeUserId, {
        $unset: unsetObj,
      });
    },
  });

  // SERVER ONLY
  const ACCOUNT_FORGOT_PWD = 'account.forgotPassword';
  Meteor.methods({
    'account.forgotPassword'({email}) {
      check(arguments[0], {
        email: String,
      });

      if (!EmailValidator.validate(email)) {
        throw new Meteor.Error(ACCOUNT_FORGOT_PWD, 'Enter a proper email.');
      }
      const existingUser = Accounts.findUserByEmail(email);
      if (!existingUser) {
        throw new Meteor.Error(ACCOUNT_FORGOT_PWD,
          `No user found with email: ${email}. Create an account.`);
      }
      Accounts.sendResetPasswordEmail(existingUser._id);
    },
  });

  const ACCOUNT_DISPLAY_NAME = 'account.setDisplayName';
  Meteor.methods({
    'account.setDisplayName'({displayName}) {
      check(arguments[0], {
        displayName: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_DISPLAY_NAME, 'Must be logged in to set display name.');
      }

      Meteor.users.update(userId, {
        $set: { displayName },
      });
    },
  });

  const ACCOUNT_IS_STRING_EMAIL = 'account.isStringEmail';
  Meteor.methods({
    'account.isStringEmail'({email}) {
      check(arguments[0], {
        email: String,
      });

      if (!EmailValidator.validate(email)) {
        throw new Meteor.Error(ACCOUNT_IS_STRING_EMAIL, `${email} is not a proper email.`);
      }
    },
  });

  const ACCOUNT_IS_EMAIL_TAKEN = 'account.isEmailTaken';
  Meteor.methods({
    'account.isEmailTaken'({email}) {
      check(arguments[0], {
        email: String,
      });

      const user = Accounts.findUserByEmail(email);
      if (user) {
        throw new Meteor.Error(ACCOUNT_IS_EMAIL_TAKEN,
          `The email ${email} is taken. Please enter another one.`);
      }
    },
  });

  Meteor.methods({
    'account.validate.inviteEmails'({emails}) {
      check(arguments[0], {
        emails: [ String ],
      });

      emails.forEach(email => Meteor.call('account.validate.inviteEmail', { email }));
    },
  });

  Meteor.methods({
    'account.validate.inviteEmail'({email}) {
      check(arguments[0], {
        email: String,
      });

      Meteor.call('account.isStringEmail', {email});
      Meteor.call('account.isEmailTaken', {email});
    },
  });

  Meteor.methods({
    'account.validate.registerEmail'({email}) {
      check(arguments[0], {
        email: String,
      });

      Meteor.call('account.isStringEmail', {email});
      Meteor.call('account.isEmailTaken', {email});
      Meteor.call('register.isEmailOnWhitelist', {email});
    },
  });
}
