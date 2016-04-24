import {Convos, Notes, Sections} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  const SECTIONS = 'sections';
  Meteor.publish(SECTIONS, function ({noteId}) {
    check(arguments[0], {
      noteId: String
    });

    if (!this.userId) {
      throw new Meteor.Error(SECTIONS, 'Must be logged in to get note sections.');
    }
    const note = Notes.findOne(noteId);
    if (!note) {
      throw new Meteor.Error(SECTIONS, 'Must get sections from existing note.');
    }
    const convo = Convos.findOne(note.convoId);
    if (!convo) {
      throw new Meteor.Error(SECTIONS, 'Must get a note from an existing convo.');
    }
    if (!convo.isUserInConvo(this.userId)) {
      throw new Meteor.Error(SECTIONS, 'Must be a member of convo to get the convo\'s note.');
    }

    return Sections.find({noteId});
  });
}
