export default {
  register({Meteor, Collections, LocalState, FlowRouter}, {email, username, password}) {
    Meteor.call('account.register', {email, username, password}, (err, user) => {
      if (err) alert(err);
      else {
        Meteor.loginWithPassword(user.username, user.password, (_err) => {
          if (!_err) {
            FlowRouter.go('/home');
          }
        });
      }
    });
  },

  login({Meteor, LocalState, FlowRouter}, {usernameOrEmail, password}) {
    Meteor.loginWithPassword(usernameOrEmail, password, (err) => {
      if (err && err.reason) return LocalState.set('LOGIN_ERROR', err.reason);
      FlowRouter.go('/home');
    });
  }
};
