import MsgUtils from '/client/modules/core/libs/msgs';
import AccountUtils from '/client/modules/core/libs/account';

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

  goToChat({Meteor, FlowRouter}) {
    const teamId = FlowRouter.getParam('teamId') ?
      FlowRouter.getParam('teamId') : AccountUtils.getMostRecentTeamId({Meteor});
    const convoId = FlowRouter.getParam('convoId') ?
      FlowRouter.getParam('convoId') : AccountUtils.getMostRecentConvoId({Meteor});

    MsgUtils.routeToChat({FlowRouter}, teamId, convoId);
  },
};
