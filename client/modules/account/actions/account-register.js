import AccountUtils from '/client/modules/core/libs/account';
import R from 'ramda';

export default {
  setRegisterEmail({Meteor, LocalState, FlowRouter}, email, nextPath) {
    Meteor.call('account.validate.registerEmail', {email}, (err, res) => {
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

    Meteor.call('account.validate.inviteEmails', {emails: nonBlanks}, err => {
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
      Meteor.call('account.setDisplayName', {displayName: username}, (err) => {
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
};
