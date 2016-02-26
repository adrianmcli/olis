import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import Teams from '../components/Teams.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addTeam: actions.teams.add,
  selectTeam: actions.teams.select
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  if (Meteor.subscribe('teams.list').ready()) {
    const teams = Collections.Teams.find({userIds: Meteor.userId()}).fetch();
    onData(null, {
      teams,
      teamId: LocalState.get('teamId')
    });
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Teams);
