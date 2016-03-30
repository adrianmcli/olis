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

  'team'({LocalState, FlowRouter, Meteor}, text) {
    const teamId = FlowRouter.getParam('teamId');
    Meteor.call('search.team', {teamId, searchString: text}, (err, res) => {
      if (err) { alert(err); }
      else {
        console.log(res);
        LocalState.set(`search.team.${teamId}.results`, res);
      }
    });
  },

  'team.clearResults'({LocalState, FlowRouter}) {
    const teamId = FlowRouter.getParam('teamId');
    LocalState.set(`search.team.${teamId}.results`, undefined);
  }
};
