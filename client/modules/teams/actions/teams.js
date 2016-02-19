export default {
  add({Meteor}) {
    Meteor.call('teams.insert', {name: `team name ${Date.now()}` , userIds: []}, (err, team) => {
      if (err) { alert(err); }
      else {
        console.log('team');
        console.log(team);
      }
    });
  }
};
