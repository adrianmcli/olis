import SectionUtils from '/client/modules/core/libs/sections';

export default {
  add({Meteor, LocalState}, name, userIds) {
    Meteor.call('teams.add', {name, userIds}, (err, teamId) => {
      if (err) { alert(err); }
      else { LocalState.set('teamId', teamId); }
    });
  },

  select({Meteor, Collections, LocalState}, teamId) {
    const prevTeamId = LocalState.get('teamId');
    if (prevTeamId) {
      Meteor.call('account.setLastTimeInTeam', {teamId: prevTeamId});
    }

    LocalState.set('teamId', teamId);
    LocalState.set('convoId', null);
    SectionUtils.releaseLock({Meteor, LocalState});
  },

  addMembers({Meteor, LocalState}, teamId, userIds) {
    Meteor.call('teams.addMembers', {teamId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  goToManageTeams({FlowRouter}) {
    FlowRouter.go('/home/teams');
  }
};
