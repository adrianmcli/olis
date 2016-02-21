import {Meteor} from 'meteor/meteor';
import {Sections, Convos, Notes} from '/lib/collections';
import Section from '/lib/section';
import {check} from 'meteor/check';

const dateInXMin = (x) => {
  const minutes = x * 60 * 1000;
  return new Date(Date.now() + minutes);
};

export default function () {
  const SECTION_ADD = 'sections.add';
  Meteor.methods({
    'sections.add'({noteId, text}) {
      check(arguments[0], {
        noteId: String,
        text: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(SECTION_ADD, 'Must be logged in to edit note.');
      }
      const note = Notes.findOne(noteId);
      if (!note) {
        throw new Meteor.Error(SECTION_ADD, 'Must edit only existing notes.');
      }
      const convo = Convos.findOne(note.convoId);
      if (!convo) {
        throw new Meteor.Error(SECTION_ADD, 'Must edit only notes of existing convos.');
      }
      if (!convo.isUserInConvo(this.userId)) {
        throw new Meteor.Error(SECTION_ADD, 'Must be a part of convo to edit its note.');
      }

      const section = new Section();
      const unlocksAt = dateInXMin(5);

      section.set({
        noteId, text,
        editingByUserId: this.userId,
        unlocksAt
      });
      section.save();
    }
  });

  const SECTION_EDIT = 'sections.edit';
  Meteor.methods({
    'sections.edit'({sectionId, text}) {
      check(arguments[0], {
        sectionId: String,
        text: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(SECTION_EDIT, 'Must be logged in to edit section.');
      }
      const section = Sections.findOne(sectionId);
      if (!section) {
        throw new Meteor.Error(SECTION_EDIT, 'Must edit only existing sections.');
      }
      const note = Notes.findOne(section.noteId);
      if (!note) {
        throw new Meteor.Error(SECTION_EDIT, 'Must edit only existing notes.');
      }
      const convo = Convos.findOne(note.convoId);
      if (!convo) {
        throw new Meteor.Error(SECTION_ADD, 'Must edit only notes of existing convos.');
      }
      if (!convo.isUserInConvo(this.userId)) {
        throw new Meteor.Error(SECTION_ADD, 'Must be a part of convo to edit its note.');
      }

      if (section.canEdit(this.userId)) {
        const unlocksAt = dateInXMin(5);
        section.set({
          text,
          editingByUserId: this.userId,
          unlocksAt
        });

        section.save();
      }
    }
  });
}
