export default {
  add({Meteor, Collections, FlowRouter}, text) {
    Meteor.call('msgs.add', {text, convoId: FlowRouter.getParam('convoId')}, (err, res) => {
      if (err) { alert(err); }
      // else { console.log(res); }
    });
  },

  loadMore({Collections, LocalState, FlowRouter}) {
    const convoId = FlowRouter.getParam('convoId');
    const convoNumMsgs = Collections.Messages.find({convoId}).count();
    LocalState.set('loadMore.convoNumMsgs', convoNumMsgs);
  },

  goToChat({FlowRouter}) {
    const teamId = FlowRouter.getParam('teamId');
    FlowRouter.go(`/team/${teamId}`);
  }
};
