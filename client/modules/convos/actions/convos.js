export default {
  add({Meteor, LocalState}, name, userIds) {
    console.log('actions.convos.add');
    Meteor.call('convos.add', {
      name: 'convo name', userIds: [ ], teamId: LocalState.get('teamId')
    }, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  select({LocalState}, convoId) {
    LocalState.set('convoId', convoId);
  }
};
