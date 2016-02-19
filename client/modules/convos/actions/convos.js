export default {
  add({Meteor, LocalState}, name, userIds) {
    console.log('actions.convos.add');
    Meteor.call('convos.add', {
      name: 'convo name', userIds: [ 'u67hoW4gHugTM7LKR' ], teamId: LocalState.get('teamId')
    }, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  select({LocalState}, convoId) {
    LocalState.set('convoId', convoId);
    console.log('LocalState');
    console.log(LocalState);
  }
};
