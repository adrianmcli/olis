import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import TeamSettings from '../components/TeamSettings/TeamSettings.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  goToChat: actions.msgs.goToChat,
  setTeamName: actions.teams.setName
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();

  let teamName;
  let teamUsers = [];
  const teamId = LocalState.get('teamId');

  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);
      teamName = team.name;
      teamUsers = Meteor.users.find({_id: {$in: team.userIds}}).fetch();
    }
  }

  onData(null, {
    teamName,
    teamUsers,
    teamId
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(TeamSettings);
