import {Convos, Notes, Teams, Widgets} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  const NOTES_SINGLE = 'notes.single';
  Meteor.publish(NOTES_SINGLE, function ({convoId}) {
    check(arguments[0], {
      convoId: String
    });

    if (!this.userId) {
      throw new Meteor.Error(NOTES_SINGLE, 'Must be logged in to get note.');
    }
    const convo = Convos.findOne(convoId);
    if (!convo) {
      throw new Meteor.Error(NOTES_SINGLE, 'Must get a note from an existing convo.');
    }
    const team = Teams.findOne(convo.teamId);
    if (!team) {
      throw new Meteor.Error(NOTES_SINGLE, 'Must get a note from a convo in an existing team.');
    }
    if (!team.isUserInTeam(this.userId)) {
      throw new Meteor.Error(NOTES_SINGLE, 'Must be a member of team to get note.');
    }
    if (!convo.isUserInConvo(this.userId)) {
      throw new Meteor.Error(NOTES_SINGLE, 'Must be a member of convo to get the convo\'s note.');
    }

    const note = Notes.findOne({convoId});

    return [
      Notes.find({convoId}),
      Widgets.find({noteId: note._id})
    ];
  });
}
