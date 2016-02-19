import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import ConvosBar from '../components/convos_bar.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addConvo: actions.convos.add,
  selectConvo: actions.convos.select
});

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  // If you only see loading, make sure you added the collection to the index
  if (Meteor.subscribe('convos.list').ready()) {
    const convos = Collections.Convos.find().fetch();
    onData(null, {convos});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ConvosBar);
