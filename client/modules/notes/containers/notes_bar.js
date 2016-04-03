import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import NotesContainer from '../components/NotesContainer.jsx';
import R from 'ramda';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';

const NotesSubs = new SubsManager();

export const depsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  editSection: actions.sections.edit,
  selectSection: actions.sections.select,
  releaseSectionLock: actions.sections.releaseLock,
});

export const composer = ({context, actions}, onData) => {
  const {Meteor, FlowRouter, Collections} = context();
  const convoId = FlowRouter.getParam('convoId');

  if (convoId) {
    if (NotesSubs.subscribe('notes.single', {convoId}).ready()) {
      const note = Collections.Notes.findOne({convoId});

      if (note) {
        const noteId = note._id;
        const _addSection = actions().sections.add.bind(null, noteId);

        if (NotesSubs.subscribe('sections', {noteId}).ready()) {
          const unsortedSections = Collections.Sections.find({noteId}).fetch();

          if (!R.isEmpty(unsortedSections)) {
            const groupById = R.groupBy(R.prop('_id'), unsortedSections);
            const sort = R.map(id => groupById[id][0]);
            const sections = sort(note.sectionIds);

            onData(null, {
              note, sections, addSection: _addSection, userId: Meteor.userId()
            });
          }
        }
      }
    }
  }
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(NotesContainer);
