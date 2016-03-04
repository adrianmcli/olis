import AccountUtils from '/client/modules/core/libs/account';
import TeamUtils from '/client/modules/core/libs/teams';
import ConvoUtils from '/client/modules/core/libs/convos';
import EmailValidator from 'email-validator';
import R from 'ramda';
import LangCodes from '/lib/constants/lang_codes';

export default {
  login({Meteor, LocalState, FlowRouter}, usernameOrEmail, password) {
    try {
      if (R.isEmpty(usernameOrEmail)) {
        throw new Meteor.Error('actions.account.login', 'Username or email must not be empty.');
      }
      if (R.isEmpty(password)) {
        throw new Meteor.Error('actions.account.login', 'Password must not be empty.');
      }

      Meteor.loginWithPassword(usernameOrEmail, password, (err) => {
        if (err) { alert(err); }
        else { FlowRouter.go('/home'); }
      });
    }
    catch (e) { alert(e); }
  },

  logout({Meteor, LocalState, FlowRouter}) {
    // Must be logged in to do these 2
    TeamUtils.select({LocalState, Meteor}, null);
    ConvoUtils.select({LocalState, Meteor}, null);
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

  setRegisterEmail({Meteor, LocalState, FlowRouter}, email) {
    Meteor.call('account.validateEmail', {email}, (err, res) => {
      if (err) { alert(err); }
      else {
        console.log(res);
        LocalState.set('register.email', email);
        FlowRouter.go('/register/username');
      }
    });
  },

  setRegisterUsername({Meteor, LocalState, FlowRouter}, username) {
    Meteor.call('account.validateUsername', {username}, (err, res) => {
      if (err) { alert(err); }
      else {
        console.log(res);
        LocalState.set('register.username', username);
        FlowRouter.go('/register/team-name');
      }
    });
  },

  setRegisterTeamName({Meteor, LocalState, FlowRouter}, teamName) {
    const nameTrim = teamName.trim();
    try {
      if (nameTrim === '') {
        throw new Meteor.Error('actions.account.setRegisterTeamName', 'Enter a non-blank team name.');
      }

      LocalState.set('register.teamName', teamName);
      FlowRouter.go('/register/invite');
    }
    catch (e) { alert(e); }
  },

  setRegisterInviteEmails({Meteor, LocalState, FlowRouter}, inviteEmails) {
    try {
      inviteEmails.forEach(email => {
        if (!EmailValidator.validate(email) && !R.isEmpty(email)) {
          throw new Meteor.Error('actions.account.setRegisterInviteEmails', 'Enter proper emails.');
        }
      });

      LocalState.set('register.inviteEmails', inviteEmails);
      AccountUtils.register({Meteor, LocalState, FlowRouter});
    }
    catch (e) { alert(e); }
  },

  skipInvites({Meteor, LocalState, FlowRouter}) {
    AccountUtils.register({Meteor, LocalState, FlowRouter});
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

  resetPassword({Meteor, FlowRouter}, token, pwd1, pwd2) {
    function _validate(password) {
      return new Promise((resolve, reject) => {
        Meteor.call('account.validatePassword', {password}, (err) => {
          if (err) { reject(err); }
          else { resolve(password); }
        });
      });
    }

    function _reset(newPassword) {
      return new Promise((resolve, reject) => {
        Accounts.resetPassword(token, newPassword, (err) => {
          if (err) { reject(err); }
          else { resolve(); }
        });
      });
    }

    try {
      if (pwd1 !== pwd2) {
        throw new Meteor.Error('actions.account.resetPassword', 'Your passwords must match.');
      }

      const newPassword = pwd1;
      _validate(newPassword)
      .then(_reset)
      .then(() => FlowRouter.go('/home'))
      .catch((err) => alert(err));
    }
    catch (e) { alert(e); }
  },

  goToMyAccount({FlowRouter}) {
    FlowRouter.go('/home/account');
  },

  goToCreateAccountTeamName({FlowRouter}) {
    FlowRouter.go('/register/team-name');
  },

  goToCreateAccountEmail({FlowRouter}) {
    FlowRouter.go('/register/email');
  },

  goToCreateAccountUsername({FlowRouter}) {
    FlowRouter.go('/register/username');
  },

  submitFindMyTeamEmail({Meteor}, email, callback) {
    try {
      if (!EmailValidator.validate(email)) {
        throw new Meteor.Error('actions.account.submitFindMyTeamEmail', 'Enter a proper email.');
      }

      Meteor.call('account.findMyTeam', {email}, (err, res) => {
        if (err) { alert(err); }
        else {
          console.log(res);
          callback();
        }
      });
    }
    catch (e) { alert(e); }
  },

  setUsername({Meteor}, username) {
    Meteor.call('account.setUsername', {username}, (err) => {
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
  }
};
