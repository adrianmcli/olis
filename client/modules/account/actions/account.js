export default {
  register({Meteor, LocalState, FlowRouter}, {email, username, password}) {
    if (email === '' || !email) {
      LocalState.set('REGISTRATION_ERROR', 'Enter an email');
    }
    if (username === '' || !username) {
      LocalState.set('REGISTRATION_ERROR', 'Enter a username.');
    }
    LocalState.set('REGISTRATION_ERROR', null);

    Meteor.call('account.register', {email, username, password}, (err, user) => {
      if (err && err.reason) { LocalState.set('REGISTRATION_ERROR', err.reason); }
      else {
        Meteor.loginWithPassword(user.username, user.password, (_err) => {
          if (_err && _err.reason) { LocalState.set('REGISTRATION_ERROR', err.reason); }
          else { FlowRouter.go('/home'); }
        });
      }
    });
  },

  login({Meteor, LocalState, FlowRouter}, {usernameOrEmail, password}) {
    LocalState.set('LOGIN_ERROR', null);

    Meteor.loginWithPassword(usernameOrEmail, password, (err) => {
      if (err && err.reason) { LocalState.set('LOGIN_ERROR', err.reason); }
      else { FlowRouter.go('/home'); }
    });
  },

  clearErrors({LocalState}) {
    LocalState.set('REGISTRATION_ERROR', null);
    LocalState.set('LOGIN_ERROR', null);
    return null;
  }
};
