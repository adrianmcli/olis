export default {
  add({Meteor, LocalState}, name, userIds) {
    console.log('actions.convos.add');
    Meteor.call('convos.add', {
      name, userIds, teamId: LocalState.get('teamId')
    }, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  select({LocalState}, convoId) {
    LocalState.set('convoId', convoId);
  },

  addMembers({Meteor}, convoId, userIds) {
    Meteor.call('convos.addMembers', {convoId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  }
};
