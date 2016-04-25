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

  const ACCOUNT_FIND_MY_TEAM = 'account.findMyTeam';
  Meteor.methods({
    'account.findMyTeam'({email}) {
      check(arguments[0], {
        email: String,
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
}
