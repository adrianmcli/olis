import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import TeamInfo from '../components/HeaderMenuItems/TeamInfo.jsx';

const depsMapper = (context, actions) => ({
  context: () => context
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections, FlowRouter} = context();

  const teamId = FlowRouter.getParam('teamId');
  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);

      onData(null, {
        teamName: team.name,
        teamInfo: team.info
      });
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(TeamInfo);
