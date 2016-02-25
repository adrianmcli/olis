export default {
  register({Meteor, LocalState, FlowRouter}) {
    // TODO submit to server
    // THEN clear the register local state, go home
    const email = LocalState.get('register.email');
    const username = LocalState.get('register.username');
    const teamName = LocalState.get('register.teamName');
    const inviteEmails = LocalState.get('register.inviteEmails');

    console.log(`inviteEmails ${inviteEmails}`);

    LocalState.set('register.email', null);
    LocalState.set('register.username', null);
    LocalState.set('register.teamName', null);
    LocalState.set('register.inviteEmails', null);

    Meteor.call('account.register', {email, username, teamName, inviteEmails});

    FlowRouter.go('/home');
  },
};
