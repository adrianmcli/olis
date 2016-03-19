import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Home from '../components/Home.jsx';

const depsMapper = (context, actions) => ({
  context: () => context
});

export const composer = ({context}, onData) => {
  const {FlowRouter} = context();
  const teamId = FlowRouter.getParam('teamId');
  const convoId = FlowRouter.getParam('convoId');

  onData(null, {teamId, convoId});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
