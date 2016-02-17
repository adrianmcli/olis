export default {
  test() {
    console.log('this is users action test');
  },

  register({Meteor, LocalState, FlowRouter}, {email, username, password}) {
    Accounts.createUser({email, username, password}, (err) => {
      if (err && err.reason) return LocalState.set('REGISTER_ERROR', err.reason);
      FlowRouter.go('/home');
    });
  },

  login({Meteor, LocalState, FlowRouter}, {usernameOrEmail, password}) {
    Meteor.loginWithPassword(usernameOrEmail, password, (err) => {
      if (err && err.reason) return LocalState.set('LOGIN_ERROR', err.reason);
      FlowRouter.go('/home');
    });
  }
};
