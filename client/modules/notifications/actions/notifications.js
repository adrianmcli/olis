export default {
  click({Meteor, FlowRouter}, teamId, convoId) {
    Meteor.call('notifications.remove', {convoId}, (err) => {
      if (err) { alert(err); }
      else { FlowRouter.go(`/team/${teamId}/convo/${convoId}`); }
    });
  }
};
