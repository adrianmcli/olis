import SectionUtils from '/client/modules/core/libs/sections';

export default {
  select({Meteor, LocalState}, convoId) {
    const prevConvoId = LocalState.get('convoId');
    if (prevConvoId) {
      Meteor.call('account.setLastTimeInConvo', {convoId: prevConvoId}, (err) => {
        if (err) { alert(err); }
      });
    }

    LocalState.set('convoId', convoId);
    if (convoId) {
      Meteor.call('account.setLastTimeInConvo', {convoId}, (err) => {
        if (err) { alert(err); }
      });
    }

    SectionUtils.releaseLock({Meteor, LocalState});
    LocalState.set('loadMore.convoNumMsgs', null);
  }
};
