import { Accounts } from 'meteor/accounts-base';
import AccountUtils from '/client/modules/core/libs/account';
import MsgUtils from '/client/modules/core/libs/msgs';
import EmailValidator from 'email-validator';
import R from 'ramda';

export default {
  login({Meteor, LocalState, FlowRouter}, email, password) {
    try {
      if (R.isEmpty(email)) {
        throw new Meteor.Error('actions.account.login', 'Email must not be empty.');
      }
      if (R.isEmpty(password)) {
        throw new Meteor.Error('actions.account.login', 'Password must not be empty.');
      }

      Meteor.loginWithPassword(email, password, (err) => {
        if (err) { alert(err); }
        else {
          const teamId = AccountUtils.getMostRecentTeamId({Meteor});
          const convoId = AccountUtils.getMostRecentConvoId({Meteor});
          MsgUtils.routeToChat({FlowRouter}, teamId, convoId);
        }
      });
    }
    catch (e) { alert(e); }
  },

  logout({Meteor, FlowRouter}) {
    FlowRouter.go('/login');

    Meteor.logout(err => {
      if (err) { alert(err); }
    });
  },

  clearErrors({LocalState}) {
    LocalState.set('REGISTRATION_ERROR', null);
    LocalState.set('LOGIN_ERROR', null);
    return null;
  },

  resetPassword({Meteor, FlowRouter, LocalState}) {
    const token = FlowRouter.getParam('token');
    const pwd = LocalState.get('register.password');

    function _reset(newPassword) {
      return new Promise((resolve, reject) => {
        Accounts.resetPassword(token, newPassword, (err) => {
          if (err) { reject(err); }
          else { resolve(); }
        });
      });
    }

    _reset(pwd)
    .then(() => {
      const teamId = AccountUtils.getMostRecentTeamId({Meteor});
      FlowRouter.go(`/team/${teamId ? teamId : ''}`);
    })
    .catch((err) => alert(err));
  },

  goToMyAccount({Meteor, FlowRouter}) {
    const user = Meteor.user();
    if (user) { FlowRouter.go(`/account/${user.displayName}`); }
  },

  submitFindMyTeamEmail({Meteor}, email, callback) {
    try {
      if (!EmailValidator.validate(email)) {
        throw new Meteor.Error('actions.account.submitFindMyTeamEmail', 'Enter a proper email.');
      }

      Meteor.call('account.findMyTeam', {email}, (err, res) => {
        if (err) { alert(err); }
        else {
          callback();
        }
      });
    }
    catch (e) { alert(e); }
  },

  submitForgotPasswordEmail({Meteor}, email, callback) {
    try {
      if (!EmailValidator.validate(email)) {
        throw new Meteor.Error(
          'actions.account.submitForgotPasswordEmail', 'Enter a proper email.');
      }

      Meteor.call('account.forgotPassword', {email}, err => {
        if (err) { alert(err); }
        else {
          if (callback) { callback(); }
        }
      });
    }
    catch (e) { alert(e); }
  },
};
