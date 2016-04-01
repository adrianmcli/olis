export default {
  'searchText.teamUsers.set'({LocalState}, searchText) {
    LocalState.set('searchText.teamUsers', searchText);
  },

  setAllUsersSearchText({LocalState}, searchText) {
    LocalState.set('searchText.allUsers', searchText);
  },

  'searchText.teamUsers.clear'({LocalState}) {
    LocalState.set('searchText.teamUsers', undefined);
  },

  'searchText.convoUsers.set'({LocalState}, searchText) {
    LocalState.set('searchText.convoUsers', searchText);
  },

  'searchText.convoUsers.clear'({LocalState}) {
    LocalState.set('searchText.convoUsers', undefined);
  },

  'searchText.team.all.set'({LocalState}, text) {
    LocalState.set('searchText.team.all', text);
  },

  'select.convo'({FlowRouter}, convoId) {
    const teamId = FlowRouter.getParam('teamId');
    FlowRouter.go(`/team/${teamId}/convo/${convoId}`);
  },

  'select.user'({Meteor, Collections, FlowRouter}, userId) {
    // TODO go to your private convo with them.
    // What if you don't have one? Start one.

    const teamId = FlowRouter.getParam('teamId');
    const privateConvo = Collections.Convos.findOne({
      $and: [
        { userIds: { $size: 2 } },
        { userIds: { $all: [ userId, Meteor.userId() ] } }
      ]
    });
    if (privateConvo) { FlowRouter.go(`/team/${teamId}/convo/${privateConvo._id}`); }
    else {
      const user = Meteor.users.findOne(userId);
      const args = {
        name: user.username,
        userIds: [ userId ],
        teamId
      };
      Meteor.call('convos.add', args, (err, res) => {
        if (err) { alert(err); }
        else { FlowRouter.go(`/team/${teamId}/convo/${res}`); }
      });
    }
  },

  'select.msg'({FlowRouter}, convoId, msgId) {
    const teamId = FlowRouter.getParam('teamId');
    FlowRouter.go(`/team/${teamId}/convo/${convoId}/msg/${msgId}`);
  }
};
