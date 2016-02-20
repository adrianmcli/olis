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

  select({LocalState}, teamId) {
    LocalState.set('teamId', teamId);
    LocalState.set('convoId', null);
  },

  addMembers({Meteor, LocalState}, teamId, userIds) {
    Meteor.call('teams.addMembers', {teamId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  }
};
