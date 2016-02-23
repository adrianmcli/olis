import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import NotesContainer from '../components/NotesContainer.jsx';
import R from 'ramda';

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  editSection: actions.sections.edit,
  selectSection: actions.sections.select,
  releaseSectionLock: actions.sections.releaseLock
});

export const composer = ({context, actions}, onData) => {
  const {Meteor, LocalState, Collections} = context();
  const convoId = LocalState.get('convoId');

  let note = {};
  let sections = [];
  let _addSection = actions().sections.add;

  if (convoId) {
    if (Meteor.subscribe('notes.single', {convoId}).ready()) {
      note = Collections.Notes.findOne({convoId});
      const noteId = note._id;

      _addSection = _addSection.bind(null, noteId);

      if (Meteor.subscribe('sections', {noteId}).ready()) {
        const unsortedSections = Collections.Sections.find({noteId}).fetch();

        if (!R.isEmpty(unsortedSections)) {
          const groupById = R.groupBy(R.prop('_id'), unsortedSections);
          const sort = R.map(id => groupById[id][0]);
          sections = sort(note.sectionIds);
        }
      }
    }
  }

  onData(null, {
    note, sections, addSection: _addSection
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NotesContainer);
