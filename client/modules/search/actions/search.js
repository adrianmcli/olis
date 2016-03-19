export default {
  setTeamUsersSearchText({LocalState}, searchText) {
    console.log(searchText);
    LocalState.set('teamUsersSearchText', searchText);
  },

  setAllUsersSearchText({LocalState}, searchText) {
    LocalState.set('allUsersSearchText', searchText);
  }
};
