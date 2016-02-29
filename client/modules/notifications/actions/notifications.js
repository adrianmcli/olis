import TeamUtils from '/client/modules/core/libs/teams';
import ConvoUtils from '/client/modules/core/libs/convos';

export default {
  click({Meteor, LocalState, Collections}, teamId, convoId) {
    Meteor.call('notifications.remove', {convoId}, (err) => {
      if (err) { alert(err); }
      else {
        TeamUtils.select({LocalState, Meteor}, teamId);
        ConvoUtils.select({LocalState, Meteor}, convoId);
      }
    });
  }
};
