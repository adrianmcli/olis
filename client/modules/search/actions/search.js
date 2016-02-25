export default {
  buildRegExp({}, searchText) {
    let words = searchText.trim().split(/[ \-\:]+/);
    let exps = words.map(word => `(?=.*${word})`);
    let fullExp = exps.join('') + '.+';
    return new RegExp(fullExp, 'i');
  },

  setTeamUsersSearchText({LocalState}, searchText) {
    LocalState.set('teamUsersSearchText', searchText);
  },
};
