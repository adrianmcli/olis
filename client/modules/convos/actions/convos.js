import SectionUtils from '/client/modules/core/libs/sections';

export default {
  add({Meteor, LocalState}, name, userIds) {
    console.log('actions.convos.add');
    Meteor.call('convos.add', {
      name, userIds, teamId: LocalState.get('teamId')
    }, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  },

  select({Meteor, LocalState}, convoId) {
    const prevConvoId = LocalState.get('convoId');
    if (prevConvoId) {
      Meteor.call('account.setLastTimeInConvo', {convoId: prevConvoId});
    }
    Meteor.call('account.setLastTimeInConvo', {convoId}, (err) => {
      if (err) { alert(err); }
      else { LocalState.set('convoId', convoId); }
    });

    SectionUtils.releaseLock({Meteor, LocalState});
  },

  addMembers({Meteor}, convoId, userIds) {
    Meteor.call('convos.addMembers', {convoId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  }
};
