import {Meteor} from 'meteor/meteor';
import {Convos, Teams} from '/lib/collections';
import Convo from '/lib/convo';
import Note from '/lib/note';
import Section from '/lib/section';
import {check} from 'meteor/check';
import R from 'ramda';

export default function () {
  const CONVOS_ADD = 'convos.add';
  Meteor.methods({
    'convos.add'({name, userIds, teamId}) {
      check(arguments[0], {
        name: String,
        userIds: [ String ],
        teamId: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(CONVOS_ADD, 'Must be logged in to insert convo.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(CONVOS_ADD, 'Must add convo to existing team.');
      }
      if (!team.isUserInTeam(userId)) {
        throw new Meteor.Error(CONVOS_ADD, 'Must be a member of team to add new convo.');
      }
      if (!team.isUserInTeam(userIds)) {
        throw new Meteor.Error(CONVOS_ADD, 'Only users in the team can be added to the convo.');
      }

      const convo = new Convo();
      const newUserIds = [ userId, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);
      convo.set({name, userIds: uniqueUserIds, teamId});
      convo.save();

      // Insert a note
      const note = new Note();
      note.set({convoId: convo._id});
      note.save();

      // Insert a section
      const text = `<h1>Notes</h1><p>Write notes here! 
        You can also edit that title up there!</p>`;
      Meteor.call('sections.add', {noteId: note._id, text});

      return convo;
    }
  });

  const CONVOS_ADD_MEMBERS = 'convos.addMembers';
  Meteor.methods({
    'convos.addMembers'({convoId, userIds}) {
      const userId = this.userId;
      check(arguments[0], {
        convoId: String,
        userIds: [ String ]
      });

      if (!userId) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Must be logged in to add members to convo.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Must add members to an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Must already be a member of convo to add new members.');
      }
      const team = Teams.findOne(convo.teamId);
      if (!team.isUserInTeam(userIds)) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Only users in the team can be added to the convo.');
      }

      const newUserIds = [ ...convo.userIds, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      convo.set({userIds: uniqueUserIds});
      convo.save();

      return convo;
    }
  });
}
