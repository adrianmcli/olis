import ConvoUtils from '/client/modules/core/libs/convos';

export default {
  add({Meteor, LocalState, FlowRouter}, name, userIds) {
    const teamId = FlowRouter.getParam('teamId');
    Meteor.call('convos.add', {name, userIds, teamId}, (err, convoId) => {
      if (err) { alert(err); }
      else { FlowRouter.go(`/team/${teamId}/convo/${convoId}`); }
    });
  },

  select({FlowRouter}, convoId) {
    const teamId = FlowRouter.getParam('teamId');
    FlowRouter.go(`/team/${teamId}/convo/${convoId}`);
  },

  addMembers({Meteor}, convoId, userIds) {
    Meteor.call('convos.addMembers', {convoId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  }
};
