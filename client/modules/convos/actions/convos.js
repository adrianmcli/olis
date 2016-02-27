import ConvoUtils from '/client/modules/core/libs/convos';

export default {
  add({Meteor, LocalState}, name, userIds) {
    console.log('actions.convos.add');
    Meteor.call('convos.add', {
      name, userIds, teamId: LocalState.get('teamId')
    }, (err, convoId) => {
      if (err) { alert(err); }
      else { ConvoUtils.select({Meteor, LocalState}, convoId); }
    });
  },

  select({Meteor, LocalState}, convoId) {
    ConvoUtils.select({Meteor, LocalState}, convoId);
  },

  addMembers({Meteor}, convoId, userIds) {
    Meteor.call('convos.addMembers', {convoId, userIds}, (err, res) => {
      if (err) { alert(err); }
      else { console.log(res); }
    });
  }
};
