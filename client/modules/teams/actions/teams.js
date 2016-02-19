export default {
  add({Meteor}) {
    Meteor.call('teams.insert', {name: `team name` , userIds: []}, (err, team) => {
      if (err) { alert(err); }
      else {
        console.log('team');
        console.log(team);
      }
    });
  },

  select({LocalState}, teamId) {
    LocalState.set('teamId', teamId);
    console.log('LocalState');
    console.log(LocalState);
  }
};
