import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import TeamsBar from '../components/teams_bar.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  if (Meteor.subscribe('teams.list').ready()) {
    const posts = Collections.Teams.find().fetch();
    onData(null, {posts});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(TeamsBar);
