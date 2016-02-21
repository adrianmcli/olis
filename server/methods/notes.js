import {Meteor} from 'meteor/meteor';
import {Notes} from '/lib/collections';
import Note from '/lib/note';
import {check} from 'meteor/check';
import R from 'ramda';

export default function () {
  const TEAMS_ADD = 'teams.add';
  Meteor.methods({
    'section.add'({noteId, text}) {
      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to edit note.');
      }

      check(arguments[0], {
        noteId: String,
        text: String
      });
    }
  });
}
