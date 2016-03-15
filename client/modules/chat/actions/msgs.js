export default {
  add({Meteor, Collections, FlowRouter}, text) {
    const convoId = FlowRouter.getParam('convoId');
    Meteor.call('msgs.add', {text, convoId}, (err, res) => {
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
    const convoId = FlowRouter.getParam('convoId');
    
    if (convoId) { FlowRouter.go(`/team/${teamId}/convo/${convoId}`); }
    else { FlowRouter.go(`/team/${teamId}`); }
  }
};
