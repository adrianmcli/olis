import TeamUtils from '/client/modules/core/libs/teams';

export default {
  add({Meteor, LocalState}, name, userIds) {
    Meteor.call('teams.add', {name, userIds}, (err, teamId) => {
      if (err) { alert(err); }
      else { TeamUtils.select({Meteor, LocalState}, teamId); }
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

  'manageTeams.selectAndGo'({Meteor, LocalState, FlowRouter}, teamId) {
    TeamUtils.select({Meteor, LocalState}, teamId);
    LocalState.set('ignoreDefaultTeamAndConvo', true);
    FlowRouter.go('/home');
  }
};
