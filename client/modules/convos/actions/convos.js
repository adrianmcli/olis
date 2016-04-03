import R from 'ramda';

export default {
  add({Meteor, LocalState, FlowRouter}, name, userIds) {
    const teamId = FlowRouter.getParam('teamId');
    Meteor.call('convos.add', {name, userIds, teamId}, (err, convoId) => {
      if (err) { alert(err); }
      else { FlowRouter.go(`/team/${teamId}/convo/${convoId}`); }
    });
  },

  select({Meteor, FlowRouter}, convoId) {
    const teamId = FlowRouter.getParam('teamId');
    FlowRouter.go(`/team/${teamId}/convo/${convoId}`);
  },

  addMembers({Meteor}, convoId, userIds) {
    Meteor.call('convos.addMembers', {convoId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  changeName({Meteor, FlowRouter}, name) {
    const convoId = FlowRouter.getParam('convoId');
    Meteor.call('convos.setName', {convoId, name}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  'newConvo.setName'({LocalState}, name) {
    LocalState.set('newConvo.name', name);
  },

  'newConvo.addUserId'({LocalState}, userId) {
    const userIdsToAdd = LocalState.get('newConvo.userIdsToAdd') ?
      LocalState.get('newConvo.userIdsToAdd') : [];
    LocalState.set('newConvo.userIdsToAdd', [ ...userIdsToAdd, userId ]);
  },

  'newConvo.removeUserId'({LocalState}, userIdToRemove) {
    const userIdsToAdd = LocalState.get('newConvo.userIdsToAdd') ?
      LocalState.get('newConvo.userIdsToAdd') : [];
    LocalState.set('newConvo.userIdsToAdd',
      R.filter(userId => userId !== userIdToRemove, userIdsToAdd));
  },

  'newConvo.clearAddedUserIds'({LocalState}) {
    LocalState.set('newConvo.userIdsToAdd', []);
  },

  setUserIdShown({LocalState}, userId) {
    LocalState.set('convoDirectory.userIdShown', userId);
  },

  remove({FlowRouter, Meteor}) {
    const convoId = FlowRouter.getParam('convoId');
    const confirmRemove = confirm(
      `Are you sure you want to delete this conversation? This action is irreversible.`
    );
    if (confirmRemove && convoId) {
      Meteor.call('convos.remove', {convoId}, err => {
        if (err) { alert(err); }
      });
    }
  },

  leave({FlowRouter, Meteor}) {
    const convoId = FlowRouter.getParam('convoId');
    Meteor.call('convos.leave', {convoId}, err => {
      if (err) { alert(err); }
    });
  }
};
