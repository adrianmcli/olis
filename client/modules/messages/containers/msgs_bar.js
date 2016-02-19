import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import MsgsBar from '../components/msgs_bar.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addMsg: actions.msgs.add
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const convoId = LocalState.get('convoId');

  // If you only see loading, make sure you added the collection to the index
  if (convoId) {
    if (Meteor.subscribe('msgs.list', {convoId}).ready()) {
      const msgs = Collections.Messages.find().fetch();
      onData(null, {msgs});
    }
  }
  else { onData(null, {msgs: []}); }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MsgsBar);
