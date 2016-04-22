import { Meteor } from 'meteor/meteor';
import R from 'ramda';
import { Widgets, Notes } from '/lib/collections';

export default function () {
  Widgets.after.insert(function (userId, widget) {
    const user = Meteor.users.findOne(userId);
    const note = Notes.findOne(widget.noteId);

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

  function getIndefiniteArticle(word) {
    const vowels = [ 'a', 'e', 'i', 'o', 'u' ];
    const firstLetter = word[0];
    const firstLetterIsVowel = R.contains(firstLetter, vowels);

    if (firstLetterIsVowel) { return 'an'; }
    return 'a';
  }
}
