export default {
  add({Meteor, Collections, LocalState}, text) {
    Meteor.call('msgs.add', {text, convoId: LocalState.get('convoId')}, (err, res) => {
      if (err) { alert(err); }
      // else { console.log(res); }
    });
  },

  loadMore({Collections, LocalState}) {
    const convoId = LocalState.get('convoId');
    const convoNumMsgs = Collections.Messages.find({convoId}).count();
    LocalState.set('loadMore.convoNumMsgs', convoNumMsgs);
  },

  goToChat({FlowRouter}) {
    FlowRouter.go('/home');
  }
};
