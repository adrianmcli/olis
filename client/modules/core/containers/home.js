import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Home from '../components/Home.jsx';

const depsMapper = (context, actions) => ({
  context: () => context
});

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter, Collections} = context();
  const teamId = FlowRouter.getParam('teamId');
  const convoId = FlowRouter.getParam('convoId');

  const user = Meteor.user();
  const team = Collections.Teams.findOne(teamId);
  if (team && !team.isUserInTeam(user._id)) {
    FlowRouter.go('/team');
  }

  onData(null, {teamId, convoId});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
