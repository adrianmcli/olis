import ConvoUtils from '/client/modules/core/libs/convos';

export default {
  // select({FlowRouter}, teamId) {
  //   // Set last time in prev team
  //   // Set last time in new team
  //   // Select null convo

  //   FlowRouter.go(`/team/${teamId}`);
  // },

  setLastTimeInTeam({Meteor}, teamId) {
    if (teamId) {
      Meteor.call('account.setLastTimeInTeam', {teamId}, (err) => {
        if (err) { alert(err); }
      });
    }
  }
};
