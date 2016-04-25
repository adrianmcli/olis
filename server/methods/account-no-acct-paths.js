import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Team from '/lib/schemas/team';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import EmailValidator from 'email-validator';

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
