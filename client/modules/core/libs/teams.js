import ConvoUtils from '/client/modules/core/libs/convos';

export default {
  setLastTimeInTeam({Meteor}, teamId) {
    if (teamId) {
      console.log('setLastTimeInTeam');
      Meteor.call('account.setLastTimeInTeam', {teamId}, (err) => {
        if (err) { alert(err); }
      });
    }
  }
};
