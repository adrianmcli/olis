import { Meteor } from 'meteor/meteor';
import { Notes, Locks, Widgets, Convos } from '/lib/collections';
import Widget from '/lib/widget';
import R from 'ramda';
import { check, Match } from 'meteor/check';

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

  Meteor.methods({
    'widgets.remove'({noteId, widgetId}) {
      check(arguments[0], {
        noteId: String,
        widgetId: String
      });

      Widgets.remove(widgetId);

      // Update note's widget array
      const note = Notes.findOne(noteId);
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

      const note = Notes.findOne(noteId);
      const indexToRemove = R.findIndex(i => i === widgetId)(note.widgetIds);
      const widgetsLessRemoved = R.remove(indexToRemove, 1, note.widgetIds);
      const newOrderedWidgets = R.insert(position, widgetId, widgetsLessRemoved);

      note.set({
        widgetIds: newOrderedWidgets
      });
    }
  });

  Meteor.methods({
    'widgets.update'({widgetId, data}) {
      check(arguments[0], {
        widgetId: String,
        data: Object
      });

      const widget = Widgets.findOne(widgetId);
      widget.set({data});
      widget.save();
    }
  });
}
