import TeamUtils from '/client/modules/core/libs/teams';
import ConvoUtils from '/client/modules/core/libs/convos';

export default {
  click({Meteor, LocalState, Collections}, notifId, teamId, convoId) {
    Meteor.call('notifications.remove', {notifId}, (err) => {
      if (err) { alert(err); }
      else {
        TeamUtils.select({LocalState, Meteor}, teamId);
        ConvoUtils.select({LocalState, Meteor}, convoId);
      }
    });
  }
};
