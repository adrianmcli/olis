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
      Meteor.call('register.isEmailOnWhitelist', {email});
    },
  });


  Meteor.methods({
    'account.validate.registerEmails'({emails}) {
      check(arguments[0], {
        emails: [ String ],
      });

      emails.forEach(email => Meteor.call('account.validate.registerEmail', { email }));
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
}
