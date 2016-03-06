import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import TeamSettings from '../components/TeamSettings/TeamSettings.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  goToChat: actions.msgs.goToChat,
  setTeamName: actions.teams.setName,
  setUserRole: actions.teams.setUserRole,
  invite: actions.teams.invite
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();

  let teamName;
  let teamUsers = [];
  const teamId = LocalState.get('teamId');
  let pendingInviteIds = [];

  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);
      teamName = team.name;

      const options = {sort: [ [ 'username', 'asc' ] ]};
      teamUsers = Meteor.users.find({_id: {$in: team.userIds}}, options).fetch();

      const invites = Collections.Invites.find({teamId}).fetch();
      pendingInviteIds = invites.map(invite => invite.userId);
    }
  }

  onData(null, {
    teamName,
    teamUsers,
    teamId,
    pendingInviteIds
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(TeamSettings);
