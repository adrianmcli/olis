import TeamUtils from '/client/modules/core/libs/teams';

export default {
  add({Meteor, LocalState}, name, userIds) {
    Meteor.call('teams.add', {name, userIds}, (err, teamId) => {
      if (err) { alert(err); }
      else { LocalState.set('teamId', teamId); }
    });
  },

  select({Meteor, LocalState}, teamId) {
    TeamUtils.select({Meteor, LocalState}, teamId);
  },

  addMembers({Meteor, LocalState}, teamId, userIds) {
    Meteor.call('teams.addMembers', {teamId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  goToManageTeams({Meteor, LocalState, FlowRouter}) {
    TeamUtils.select({Meteor, LocalState}, null);
    FlowRouter.go('/home/teams');
  },

  selectAndGo({LocalState, FlowRouter}, teamId) {
    LocalState.set('teamId', teamId);
    FlowRouter.go('/home');
  }
};
