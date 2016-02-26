export default {
  oldRegister({Meteor, LocalState, FlowRouter}, {email, username, password}) {
    LocalState.set('REGISTRATION_ERROR', null);
    if (email === '' || !email) {
      LocalState.set('REGISTRATION_ERROR', 'Enter an email');
    }
    if (username === '' || !username) {
      LocalState.set('REGISTRATION_ERROR', 'Enter a username.');
    }

    function _register() {
      return new Promise((resolve, reject) => {
        Meteor.call('account.register', {email, username, password}, (err) => {
          if (err) { reject(err); }
          else { resolve('registered'); }
        });
      });
    }

    function _login() {
      return new Promise((resolve, reject) => {
        Meteor.loginWithPassword(username, password, (err) => {
          if (err) { reject(err); }
          else { resolve('logged in'); }
        });
      });
    }

    _register()
    .then(_login)
    .then(() => FlowRouter.go('/home'))
    .catch((err) => {
      console.log('REGISTRATION_ERROR');
      console.log(err);
    });
  },

  register({Meteor, LocalState, FlowRouter}) {
    const email = LocalState.get('register.email');
    const username = LocalState.get('register.username');
    const teamName = LocalState.get('register.teamName');
    const inviteEmails = LocalState.get('register.inviteEmails');

    LocalState.set('register.email', null);
    LocalState.set('register.username', null);
    LocalState.set('register.teamName', null);
    LocalState.set('register.inviteEmails', null);

    Meteor.call('account.register', {email, username, teamName, inviteEmails});

    FlowRouter.go('/home');
  },
};
