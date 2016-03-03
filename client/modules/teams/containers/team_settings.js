import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import TeamSettings from '../components/TeamSettings/TeamSettings.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  goToChat: actions.msgs.goToChat
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();

  let teamName;
  const teamId = LocalState.get('teamId');

  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);
      teamName = team.name;
    }
  }

  onData(null, {
    teamName
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(TeamSettings);
