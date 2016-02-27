import ConvoUtils from '/client/modules/core/libs/convos';

export default {
  select({LocalState, Meteor}, teamId) {
    const prevTeamId = LocalState.get('teamId');
    if (prevTeamId) {
      Meteor.call('account.setLastTimeInTeam', {teamId: prevTeamId}, (err) => {
        if (err) { alert(err); }
      });
    }

    LocalState.set('teamId', teamId);
    if (teamId) {
      Meteor.call('account.setLastTimeInTeam', {teamId}, (err) => {
        if (err) { alert(err); }
      });
    }

    ConvoUtils.select({Meteor, LocalState}, null);
  }
};
