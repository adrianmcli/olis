import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import TeamSettings from '../components/TeamSettings/TeamSettings.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  goToChat: actions.msgs.goToChat,
  setTeamName: actions.teams.setName,
  setTeamInfo: actions.teams.setInfo,
  setUserRole: actions.teams.setUserRole,
  invite: actions.teams.invite
});

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter, Collections} = context();

  let teamName;
  let teamInfo;
  let teamUsers = [];
  const teamId = FlowRouter.getParam('teamId');
  let pendingInviteIds = [];

  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);
      teamName = team.name;
      teamInfo = team.info;

      const options = {sort: [ [ 'username', 'asc' ] ]};
      teamUsers = Meteor.users.find({_id: {$in: team.userIds}}, options).fetch();

      const invites = Collections.Invites.find({teamId}).fetch();
      pendingInviteIds = invites.map(invite => invite.userId);
    }
  }

  onData(null, {
    teamName,
    teamInfo,
    teamUsers,
    teamId,
    pendingInviteIds
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(TeamSettings);
