import {Meteor} from 'meteor/meteor';
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
}
