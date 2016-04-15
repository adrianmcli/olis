import { Meteor } from 'meteor/meteor';
import { Notes, Locks, Widgets, Convos } from '/lib/collections';
import Widget from '/lib/schemas/widget';
import R from 'ramda';
import { check, Match } from 'meteor/check';
import { TIMEOUT } from '/lib/constants/widgets';

export default function () {
  const WIDGETS_ADD = 'widgets.add';
  Meteor.methods({
    'widgets.add'({noteId, type, data}) {
      check(arguments[0], {
        noteId: String,
        type: String,
        data: Match.Optional(Match.OneOf(undefined, null, Object)),
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(WIDGETS_ADD, 'Must be logged in to add widgets.');
      }
      const note = Notes.findOne(noteId);
      if (!note) {
        throw new Meteor.Error(WIDGETS_ADD, 'Must add widget to existing note.');
      }
      const convo = Convos.findOne(note.convoId);
      if (!convo) {
        throw new Meteor.Error(WIDGETS_ADD, 'Must add widgets to an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(WIDGETS_ADD, 'Must be a part of convo to add widgets.');
      }

      // Insert new widget
      const widget = new Widget();
      widget.set({
        noteId,
        type,
        data: data ? data : null
      });
      widget.save();
      const widgetId = widget._id;

      // Insert widget id into note
      const newWidgets = R.append(widgetId, note.widgetIds);
      note.set({
        widgetIds: newWidgets
      });
      note.save();
    }
  });

  const WIDGETS_REMOVE = 'widgets.remove';
  Meteor.methods({
    'widgets.remove'({noteId, widgetId}) {
      check(arguments[0], {
        noteId: String,
        widgetId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must be logged in to add widgets.');
      }
      const note = Notes.findOne(noteId);
      if (!note) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must add widget to existing note.');
      }
      const convo = Convos.findOne(note.convoId);
      if (!convo) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must add widgets to an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must be a part of convo to add widgets.');
      }

      Widgets.remove(widgetId);

      // Update note's widget array
      const toDeleteIndex = R.findIndex(id => id === widgetId, note.widgetIds);
      const newWidgets = R.remove(toDeleteIndex, 1, note.widgetIds);
      note.set({
        widgetIds: newWidgets
      });
      note.save();
    }
  });

  Meteor.methods({
    'widgets.move'({noteId, widgetId, position}) {
      check(arguments[0], {
        noteId: String,
        widgetId: String,
        position: Number
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must be logged in to add widgets.');
      }
      const note = Notes.findOne(noteId);
      if (!note) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must add widget to existing note.');
      }
      const convo = Convos.findOne(note.convoId);
      if (!convo) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must add widgets to an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must be a part of convo to add widgets.');
      }

      const indexToRemove = R.findIndex(i => i === widgetId)(note.widgetIds);
      const widgetsLessRemoved = R.remove(indexToRemove, 1, note.widgetIds);
      const newOrderedWidgets = R.insert(position, widgetId, widgetsLessRemoved);

      note.set({
        widgetIds: newOrderedWidgets
      });
      note.save();
    }
  });

  Meteor.methods({
    'widgets.update'({widgetId, data}) {
      check(arguments[0], {
        widgetId: String,
        data: Object
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must be logged in to add widgets.');
      }
      const widget = Widgets.findOne(widgetId);
      if (!widget) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must remove an existing widget.');
      }
      const note = Notes.findOne(widget.noteId);
      if (!note) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must add widget to existing note.');
      }
      const convo = Convos.findOne(note.convoId);
      if (!convo) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must add widgets to an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(WIDGETS_REMOVE, 'Must be a part of convo to add widgets.');
      }

      const lock = Locks.findOne({widgetId});
      if (lock) {
        const timeDiff = new Date() - lock.updatedAt;
        if (timeDiff >= TIMEOUT || lock.userId === userId) { doUpdate({widget, note, convo, data}); }
      }
      else { doUpdate({widget, note, convo, data}); }
    }
  });
}

function doUpdate({widget, note, convo, data}) {
  widget.set({data});
  widget.save();

  // To trigger the updated at change
  note.set({ updatedAt: new Date() });
  note.save();

  convo.set({ updatedAt: new Date() });
  convo.save();
}
