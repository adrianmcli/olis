export default {
  setLastTimeInTeam({Meteor}, teamId) {
    if (teamId) {
      Meteor.call('account.setLastTimeInTeam', {teamId}, (err) => {
        // if (err) { alert(err); }
      });
    }
  }
};
