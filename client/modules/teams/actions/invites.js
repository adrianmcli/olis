export default {
  select({Meteor, LocalState, FlowRouter}, teamId) {
    // Remove invite
    Meteor.call('invites.remove', {teamId}, err => {
      if (err) { alert(err); }
    });
    FlowRouter.go(`/team/${teamId}`);
  }
};
