import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import ConvosBar from '../components/convos_bar.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addConvo: actions.convos.add,
  selectConvo: actions.convos.select
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const teamId = LocalState.get('teamId');

  // If you only see loading, make sure you added the collection to the index
  if (teamId) {
    if (Meteor.subscribe('convos.list', {teamId}).ready()) {
      const convos = Collections.Convos.find().fetch();
      onData(null, {convos});
    }
  }
  else { onData(null, {convos: []}); }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ConvosBar);
