import { Meteor } from 'meteor/meteor';
import R from 'ramda';
import { Widgets, Notes, Convos } from '/lib/collections';

export default function () {
  Widgets.after.insert(function (userId, widget) {
    const user = Meteor.users.findOne(userId);
    const note = Notes.findOne(widget.noteId);
    const convo = Convos.findOne(note.convoId);

    // Insert widget id into note
    const widgetId = widget._id;
    const newWidgets = R.append(widgetId, note.widgetIds);
    note.set({
      widgetIds: newWidgets,
      updatedByUsername: user.displayName,
    });
    note.save();

    // Send system msg
    if (convo.sendSystemMsgs) {
      Meteor.call('msgs.add.text', {
        text: `${user.displayName} added ${getIndefiniteArticle(widget.type)} ${widget.type} tool.`,
        convoId: note.convoId,
        isSystemMsg: true,
      });
    }
  });

  // Collection hooks better than Astro events, you can retrieve the previous doc after update
  // Use this.previous for prev doc
  Widgets.after.update(function (userId, widget, fieldNames, modifier, options) {
    const prev = this.previous;
    const note = Notes.findOne(widget.noteId);
    const user = Meteor.users.findOne(userId);

    // To trigger the updated at change
    note.set({ updatedAt: new Date(), updatedByUsername: user.displayName });
    note.save();

    // Send system msg
    const now = new Date();
    const timeDiff = now - widget.updatedAt;
    const minutes = 1;
    const justCreated = prev.createdAt - prev.updatedAt === 0;

    if (timeDiff > minutes * 60 * 1000 || justCreated) {
      Meteor.call('msgs.add.text', {
        text: `${user.displayName} updated ${getIndefiniteArticle(widget.type)} ${widget.type} tool.`,
        convoId: note.convoId,
        isSystemMsg: true,
      });
    }
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
