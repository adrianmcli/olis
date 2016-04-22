import { Meteor } from 'meteor/meteor';
import R from 'ramda';
import { Widgets, Notes } from '/lib/collections';

export default function () {
  Widgets.after.insert(function (userId, widget) {
    const user = Meteor.users.findOne(userId);
    const note = Notes.findOne(widget.noteId);

    // Insert widget id into note
    const widgetId = widget._id;
    const newWidgets = R.append(widgetId, note.widgetIds);
    note.set({
      widgetIds: newWidgets,
      updatedByUsername: user.displayName,
    });
    note.save();

    // Send system msg
    Meteor.call('msgs.add.text', {
      text: `${user.displayName} added ${getIndefiniteArticle(widget.type)} ${widget.type} tool.`,
      convoId: note.convoId,
      isSystemMsg: true,
    });
  });

  // Collection hooks better than Astro events, you can retrieve the previous doc after update
  Widgets.after.update(function (userId, doc, fieldNames, modifier, options) {

  });

  Widgets.after.remove(function (userId, widget) {
    const widgetId = widget._id;
    const note = Notes.findOne(widget.noteId);

    // Update note's widget array
    const toDeleteIndex = R.findIndex(id => id === widgetId, note.widgetIds);
    const newWidgets = R.remove(toDeleteIndex, 1, note.widgetIds);
    const user = Meteor.users.findOne(userId);
    note.set({
      widgetIds: newWidgets,
      updatedByUsername: user.displayName,
    });
    note.save();

    // Send system msg
    Meteor.call('msgs.add.text', {
      text: `${user.displayName} removed ${getIndefiniteArticle(widget.type)} ${widget.type} tool.`,
      convoId: note.convoId,
      isSystemMsg: true,
    });
  });

  function getIndefiniteArticle(word) {
    const vowels = [ 'a', 'e', 'i', 'o', 'u' ];
    const firstLetter = word[0];
    const firstLetterIsVowel = R.contains(firstLetter, vowels);

    if (firstLetterIsVowel) { return 'an'; }
    return 'a';
  }
}
