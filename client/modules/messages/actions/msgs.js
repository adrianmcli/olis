export default {
  add({Meteor, LocalState}, text) {
    console.log('actions.msgs.add');
    Meteor.call('msgs.add', {text: 'msg text', convoId: LocalState.get('convoId')}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  }
};
