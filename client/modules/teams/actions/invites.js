import TeamUtils from '/client/modules/core/libs/teams';

export default {
  select({Meteor, LocalState, FlowRouter}, teamId) {
    // Remove invite
    Meteor.call('invites.remove', {teamId}, err => {
      if (err) { alert(err); }
    });

    // Select team and route to it
    TeamUtils.select({LocalState, Meteor}, teamId);
  }
};
