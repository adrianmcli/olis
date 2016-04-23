import { Accounts } from 'meteor/accounts-base';
import AccountUtils from '/client/modules/core/libs/account';
import MsgUtils from '/client/modules/core/libs/msgs';
import EmailValidator from 'email-validator';
import R from 'ramda';
import LangCodes from '/lib/constants/lang_codes';

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

  setRegisterEmail({Meteor, LocalState, FlowRouter}, email, nextPath) {
    Meteor.call('account.validateEmail', {email}, (err, res) => {
      if (err) { alert(err); }
      else {
        LocalState.set('register.email', email);
        if (nextPath) { FlowRouter.go(nextPath); }
      }
    });
  },

  setRegisterUsername({Meteor, LocalState, FlowRouter}, username, nextPath) {
    // Meteor.call('account.validateUsername', {username}, (err, res) => {
      // if (err) { alert(err); }
      // else {
        // console.log(res);
    LocalState.set('register.username', username);
    if (nextPath) { FlowRouter.go(nextPath); }
      // }
    // });
  },

  setRegisterPassword({Meteor, LocalState, FlowRouter}, password1, password2, nextPath) {
    // TODO validate length etc...
    const passwordTrim = password1.trim();
    try {
      if (password1 !== password2) {
        throw new Meteor.Error('actions.account.setRegisterPassword', 'Passwords must match.');
      }
      if (passwordTrim === '') {
        throw new Meteor.Error('actions.account.setRegisterPassword', 'Enter a non-blank password.');
      }

    }
    catch (e) { alert(e); }
    LocalState.set('register.password', passwordTrim);
    if (nextPath) { FlowRouter.go(nextPath); }
  },

  setRegisterTeamName({Meteor, LocalState, FlowRouter}, teamName, nextPath) {
    const nameTrim = teamName.trim();
    try {
      if (nameTrim === '') {
        throw new Meteor.Error('actions.account.setRegisterTeamName', 'Enter a non-blank team name.');
      }

      LocalState.set('register.teamName', teamName);
      if (nextPath) { FlowRouter.go(nextPath); }
    }
    catch (e) { alert(e); }
  },

  setRegisterInviteEmails({Meteor, LocalState, FlowRouter}, inviteEmails, callback) {
    const nonBlanks = R.filter(email => email !== '', inviteEmails);

    Meteor.call('account.validateEmails', {emails: nonBlanks}, err => {
      if (err) { alert(err); }
      else {
        LocalState.set('register.inviteEmails', nonBlanks);
        if (callback) { callback(); }
      }
    });
  },

  finishRegistration({Meteor, LocalState, FlowRouter}) {
    AccountUtils.register({Meteor, LocalState, FlowRouter});
  },

  finishInviteeOnboard({Meteor, LocalState, FlowRouter}) {
    const pwd = LocalState.get('register.password');
    const username = LocalState.get('register.username');
    const token = FlowRouter.getParam('token');

    const _setUsername = () => {
      Meteor.call('account.setUsername', {username}, (err) => {
        if (err) { alert(err); }
      });
    };

    AccountUtils.resetPassword({Meteor, FlowRouter}, token, pwd, pwd, _setUsername);
  },

  addMoreInvites({LocalState}) {
    const current = LocalState.get('register.numInviteInputs') ?
      LocalState.get('register.numInviteInputs') : 3;

    LocalState.set('register.numInviteInputs', current + 1);
  },

  validateEmail({Meteor}, email, onError, onSuccess) {
    Meteor.call('account.validateEmail', {email}, (err, res) => {
      if (err) {
        if (onError) { onError(err); }
      }
      else {
        if (onSuccess) { onSuccess(); }
      }
    });
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

  setUsername({Meteor}, username) {
    Meteor.call('account.setDisplayName', {displayName: username}, (err) => {
      if (err) { alert(err); }
      else { alert('Username changed!'); }
    });
  },

  changePassword({Meteor}, oldPassword, newPassword1, newPassword2) {
    try {
      if (newPassword1 !== newPassword2) {
        throw new Meteor.Error('actions.account.changePassword', 'New passwords must match.');
      }

      Accounts.changePassword(oldPassword, newPassword1, (err) => {
        if (err) { alert(err); }
        else { alert('Password changed!'); }
      });
    }
    catch (e) { alert(e); }
  },

  setEmail({Meteor}, email) {
    try {
      if (!EmailValidator.validate(email)) {
        throw new Meteor.Error('actions.account.setEmail', 'Enter a proper email.');
      }

      Meteor.call('account.setEmail', {email}, err => {
        if (err) { alert(err); }
        else { alert('Email changed!'); }
      });
    }
    catch (e) { alert(e); }
  },

  setTranslationLanguage({Meteor}, langCode) {
    try {
      if (!R.contains(langCode, R.keys(LangCodes))) {
        throw new Meteor.Error(
          'actions.account.setTranslationLanguage', 'Select a proper language code.');
      }

      Meteor.call('account.setTranslationLanguage', {langCode}, err => {
        if (err) { alert(err); }
        else { console.log('Translation language changed.'); }
      });
    }
    catch (e) { alert(e); }
  },

  setMuteNotificationSound({Meteor}, mute) {
    Meteor.call('account.setMuteNotificationSound', {mute}, err => {
      if (err) { alert(err); }
    });
  },
};
