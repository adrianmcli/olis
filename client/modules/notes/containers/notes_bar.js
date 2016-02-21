import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import NotesBar from '../components/notes_bar.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const convoId = LocalState.get('convoId');

  if (convoId) {
    if (Meteor.subscribe('notes.single', {convoId}).ready()) {
      const note = Collections.Notes.findOne({convoId});
      onData(null, {note});
    }
  }
  else { onData(null, {note: []}); }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NotesBar);
