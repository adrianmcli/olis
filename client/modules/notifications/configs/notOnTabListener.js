import TeamUtils from '/client/modules/core/libs/teams';
import ConvoUtils from '/client/modules/core/libs/convos';

export default function ({LocalState, FlowRouter, Meteor, Collections}) {
  function handle() {
    if (Meteor.userId()) {
      const teamId = FlowRouter.getParam('teamId');
      const convoId = FlowRouter.getParam('convoId');

      TeamUtils.setLastTimeInTeam({Meteor}, teamId);
      ConvoUtils.setLastTimeInConvo({Meteor, Collections}, convoId);

      Meteor.call('notifications.remove', {convoId}, (err) => {
        if (err) { alert(err); }
      });
    }
  }

  $(window).focus(function () {
    // console.log('window focus');
    LocalState.set('window.isFocused', true);
    handle();
  });

  $(window).blur(function () {
    // console.log('window blur');
    LocalState.set('window.isFocused', false);
    handle();
  });
}
