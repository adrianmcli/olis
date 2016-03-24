import {Meteor} from 'meteor/meteor';
import {Convos, Teams} from '/lib/collections';
import Note from '/lib/note';
import {check} from 'meteor/check';

export default function () {
  const NOTES_ADD = 'notes.add';
  Meteor.methods({
    'notes.add'({convoId}) {
      check(arguments[0], {
        convoId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(NOTES_ADD, 'Must be logged in to insert note.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(NOTES_ADD, 'Must insert note into existing convo.');
      }
      if (!convo.isUserInConvo) {
        throw new Meteor.Error(NOTES_ADD, 'Must be a member of convo to insert note into it.');
      }
      const team = Teams.findOne(convo.teamId);
      if (!team) {
        throw new Meteor.Error(NOTES_ADD, 'Must add note to existing team.');
      }
      if (!team.isUserInTeam(userId)) {
        throw new Meteor.Error(NOTES_ADD, 'Must be a member of team to insert new note.');
      }

      // Insert a note
      const note = new Note();
      note.set({convoId: convo._id});
      note.save();

      // Insert a section, server only
      // const header = `<h1>Notes</h1>`;
      // const body = `<p>Write notes here! You can also edit that title up there!</p>`;
      // const section = Meteor.call('sections.add', {noteId: note._id, text: header});
      // Meteor.call('sections.add', {
      //   noteId: note._id, text: body, afterSectionId: section._id
      // });
      // const text = `<h1>Notes</h1><p>Write notes here! You can also edit that title up there!</p>`;
      Meteor.call('sections.add', {noteId: note._id});

      return convo._id;
    }
  });
}
