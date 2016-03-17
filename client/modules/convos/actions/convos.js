import R from 'ramda';

export default {
  add({Meteor, LocalState, FlowRouter}, name, userIds) {
    const teamId = FlowRouter.getParam('teamId');
    Meteor.call('convos.add', {name, userIds, teamId}, (err, convoId) => {
      if (err) { alert(err); }
      else { FlowRouter.go(`/team/${teamId}/convo/${convoId}`); }
    });
  },

  select({FlowRouter}, convoId) {
    const teamId = FlowRouter.getParam('teamId');
    FlowRouter.go(`/team/${teamId}/convo/${convoId}`);
  },

  addMembers({Meteor}, convoId, userIds) {
    Meteor.call('convos.addMembers', {convoId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  'newConvo.addUser'({LocalState}, user) {
    const usersToAdd = LocalState.get('newConvo.usersToAdd') ?
      LocalState.get('newConvo.usersToAdd') : [];
    LocalState.set('newConvo.usersToAdd', [ ...usersToAdd, user ]);
  },

  'newConvo.removeUser'({LocalState}, userToRemove) {
    const usersToAdd = LocalState.get('newConvo.usersToAdd') ?
      LocalState.get('newConvo.usersToAdd') : [];
    LocalState.set('newConvo.usersToAdd',
      R.filter(user => user._id !== userToRemove._id, usersToAdd));
  }
};
