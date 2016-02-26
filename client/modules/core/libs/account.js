export default {
  register({Meteor, LocalState, FlowRouter}) {
    const email = LocalState.get('register.email');
    const username = LocalState.get('register.username');
    const teamName = LocalState.get('register.teamName');
    const inviteEmails = LocalState.get('register.inviteEmails');

    LocalState.set('register.email', null);
    LocalState.set('register.username', null);
    LocalState.set('register.teamName', null);
    LocalState.set('register.inviteEmails', null);

    function _register() {
      return new Promise((resolve, reject) => {
        Meteor.call('account.register', {email, username, teamName, inviteEmails}, (err, res) => {
          if (err) { reject(err); }
          else { resolve(res); }
        });
      });
    }

    function _login(password) {
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
};
