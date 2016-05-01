import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import EmailValidator from 'email-validator';

export default function () {
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
