import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import NotesContainer from '../components/NotesContainer.jsx';
import R from 'ramda';
import {SubsManager} from 'meteor/meteorhacks:subs-manager';

const NotesSubs = new SubsManager();

export const depsMapper = (context, actions) => ({
  context: () => context,
  addWidget: actions.widgets.add,
  removeWidget: actions.widgets.remove,
  moveWidget: actions.widgets.move,
  updateWidget: actions.widgets.update,
  requestAndReleaseLock: actions.widgets.lock
});

export const composer = ({context, actions}, onData) => {
  const {Meteor, FlowRouter, Collections} = context();
  const convoId = FlowRouter.getParam('convoId');

  if (convoId) {
    const subNote = NotesSubs.subscribe('notes.single', {convoId});
    if (subNote.ready()) {
      const note = Collections.Notes.findOne({convoId});
      const noteId = note._id;

      const unorderedWidgets = Collections.Widgets.find({noteId}).fetch();
      const widgetOrder = note.widgetIds;
      const widgets = getOrderedWidgets(unorderedWidgets, widgetOrder);

      const locksArr = Collections.Locks.find({noteId}).fetch();
      const locks = R.zipObj(locksArr.map(lock => lock.widgetId), locksArr);

      onData(null, {
        note,
        userId: Meteor.userId(),
        widgets,
        locks
      });
    }
  }
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(NotesContainer);

function getOrderedWidgets(widgets, widgetOrder) {
  if (!R.isEmpty(widgets)) {
    const groupById = R.groupBy(R.prop('_id'), widgets);
    const sortById = R.map(id => groupById[id][0]);
    return sortById(widgetOrder);
  }
  return [];
}
