import AccountUtils from '/client/modules/core/libs/account';
import TeamUtils from '/client/modules/core/libs/teams';
import ConvoUtils from '/client/modules/core/libs/convos';

export default {
  login({Meteor, LocalState, FlowRouter}, {usernameOrEmail, password}) {
    Meteor.loginWithPassword(usernameOrEmail, password, (err) => {
      if (err) { alert(err); }
      else { FlowRouter.go('/home'); }
    });
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
    Meteor.call('account.validateTeamName', {teamName}, (err, res) => {
      if (err) { alert(err); }
      else {
        LocalState.set('register.teamName', teamName);
        FlowRouter.go('/register/invite');
      }
    });
  },

  setRegisterInviteEmails({Meteor, LocalState, FlowRouter}, inviteEmails) {
    LocalState.set('register.inviteEmails', inviteEmails);
    AccountUtils.register({Meteor, LocalState, FlowRouter});
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

  resetPassword({Meteor, FlowRouter}, token, newPassword) {
    function _validate() {
      return new Promise((resolve, reject) => {
        Meteor.call('account.validatePassword', {password: newPassword}, (err) => {
          if (err) { reject(err); }
          else { resolve(); }
        });
      });
    }

    function _reset() {
      return new Promise((resolve, reject) => {
        Accounts.resetPassword(token, newPassword, (err) => {
          if (err) { reject(err); }
          else { resolve(); }
        });
      });
    }

    _validate()
    .then(_reset)
    .then(() => FlowRouter.go('/home'))
    .catch((err) => alert(err));
  }
};
