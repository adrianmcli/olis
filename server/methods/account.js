import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import R from 'ramda';

export default function () {
  Meteor.methods({
    'account.register'({email, username, password}) {
      check(arguments[0], {
        email: String,
        username: String,
        password: String
      });

      const userId = Accounts.createUser({username, email, password});
      const myself = {_id: userId, username, email};
      const myselfWithPwd = R.merge(myself, {password});
      return myselfWithPwd;
    }
  });
}
