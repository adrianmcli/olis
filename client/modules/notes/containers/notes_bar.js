import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import NotesContainer from '../components/NotesContainer.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  addSection: actions.sections.add,
  editSection: actions.sections.edit
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const convoId = LocalState.get('convoId');

  if (convoId) {
    if (Meteor.subscribe('notes.single', {convoId}).ready()) {
      const note = Collections.Notes.findOne({convoId});
      const noteId = note._id;

      // TODO order the sections properly
      if (Meteor.subscribe('sections', {noteId}).ready()) {
        const sections = Collections.Sections.find({noteId}).fetch();
        onData(null, {note, sections});
      }
    }
  }
  else { onData(null, {
    note: {},
    sections: []
  }); }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NotesContainer);
