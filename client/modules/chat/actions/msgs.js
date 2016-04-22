import MsgUtils from '/client/modules/core/libs/msgs';
import AccountUtils from '/client/modules/core/libs/account';
import {VISIBLE_INTERVAL} from '/lib/constants/msgs';

export default {
  add({Meteor, Collections, FlowRouter}, content) {
    const teamId = FlowRouter.getParam('teamId');
    const convoId = FlowRouter.getParam('convoId');
    const msgId = FlowRouter.getParam('msgId');

    // Typed a msg while on search route, take them back to regular convo route
    // With their view at the newest msg.
    if (msgId) { FlowRouter.go(`/team/${teamId}/convo/${convoId}`); }

    Meteor.call('msgs.add', {content, convoId}, err => {
      if (err) { alert(err); }
    });
  },

  loadMoreOlder({Collections, LocalState, FlowRouter}) {
    const convoId = FlowRouter.getParam('convoId');
    const convoNumMsgs = Collections.Messages.find({convoId}).count();
    LocalState.set(`loadMore.convo.${convoId}.numMsgs`, convoNumMsgs);
  },

  loadMoreOlderSearch({Collections, LocalState, FlowRouter}, oldestMsgId) {
    const convoId = FlowRouter.getParam('convoId');
    LocalState.set(`convo.${convoId}.oldestMsgId`, oldestMsgId);
  },

  loadMoreNewerSearch({Collections, LocalState, FlowRouter}, newestMsgId) {
    const convoId = FlowRouter.getParam('convoId');
    LocalState.set(`convo.${convoId}.newestMsgId`, newestMsgId);
  },

  goToChat({Meteor, FlowRouter}) {
    const teamId = FlowRouter.getParam('teamId') ?
      FlowRouter.getParam('teamId') : AccountUtils.getMostRecentTeamId({Meteor});
    const convoId = FlowRouter.getParam('convoId') ?
      FlowRouter.getParam('convoId') : AccountUtils.getMostRecentConvoId({Meteor});

    MsgUtils.routeToChat({FlowRouter}, teamId, convoId);
  },

  incrementNumVisible({LocalState, FlowRouter}) {
    const convoId = FlowRouter.getParam('convoId');
    const numVisible = LocalState.get(`${convoId}.msgs.numVisible`) ?
      LocalState.get(`${convoId}.msgs.numVisible`) : VISIBLE_INTERVAL;
    LocalState.set(`${convoId}.msgs.numVisible`, numVisible + VISIBLE_INTERVAL);
  }
};
