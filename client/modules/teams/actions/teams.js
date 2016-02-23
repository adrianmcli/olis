import SectionUtils from '/client/modules/core/libs/sections';

export default {
  add({Meteor}, name, userIds) {
    Meteor.call('teams.add', {name, userIds}, (err, team) => {
      if (err) { alert(err); }
      else {
        console.log('team');
        console.log(team);
      }
    });
  },

  select({Meteor, Collections, LocalState}, teamId) {
    LocalState.set('teamId', teamId);
    LocalState.set('convoId', null);
    SectionUtils.releaseLock({Meteor, LocalState});
  },

  addMembers({Meteor, LocalState}, teamId, userIds) {
    Meteor.call('teams.addMembers', {teamId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  }
};
