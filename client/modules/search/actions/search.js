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
  }
};
