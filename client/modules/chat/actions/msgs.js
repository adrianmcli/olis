export default {
  add({Meteor, LocalState}, text) {
    Meteor.call('msgs.add', {text, convoId: LocalState.get('convoId')}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  }
};
