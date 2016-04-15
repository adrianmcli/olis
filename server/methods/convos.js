import {Meteor} from 'meteor/meteor';
import {
  Convos, Teams, Notifications, Messages, Notes, Sections
} from '/lib/collections';
import Convo from '/lib/schemas/convo';
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
      convo.set({
        name,
        userIds: [ userId ], // Add yourself first so you can call addMembers method
        teamId});
      convo.save();
      const convoId = convo._id;

      Meteor.call('convos.addMembers', {convoId, userIds: [ userId, ...userIds ]});
      Meteor.call('notes.add', {convoId});

      return convoId;
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
        throw new Meteor.Error(CONVOS_ADD_MEMBERS,
          'Must already be a member of convo to add new members.');
      }
      const team = Teams.findOne(convo.teamId);
      if (!team.isUserInTeam(userIds)) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS,
          'Only users in the team can be added to the convo.');
      }

      const newUserIds = [ ...convo.userIds, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);
      const recentUserIds = R.takeLast(2, uniqueUserIds);
      const recentUsers = Meteor.users.find({_id: {$in: recentUserIds}}).fetch();
      const recentUsernames = recentUsers.map(x => x.username);

      convo.set({
        userIds: uniqueUserIds,
        recentUserIds,
        recentUsernames,
      });
      convo.save();

      const addedUsers = Meteor.users.find({
        _id: { $in: userIds }
      }).fetch();
      const addedUsernames = addedUsers.map(newUser => newUser.username);
      const addedString = addedUsernames.reduce((prev, curr, index) => {
        if (index > 0) { return `${prev}, ${curr}`; }
        return `${curr}`;
      }, '');

      Meteor.call('msgs.add', {
        text: `${addedString} ${addedUsernames.length > 1 ? 'were' : 'was'} added to the chat.`,
        convoId,
        isSystemMsg: true
      });

      return convo;
    }
  });

  const CONVOS_REMOVE_MEMBER = 'convos.removeMember';
  Meteor.methods({
    'convos.removeMember'({convoId, removeUserId}) {
      check(arguments[0], {
        convoId: String,
        removeUserId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(CONVOS_REMOVE_MEMBER, 'Must be logged in to remove member from convo.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(CONVOS_REMOVE_MEMBER, 'Must remove user from existing convo.');
      }
      if (!convo.isUserInConvo(removeUserId)) {
        throw new Meteor.Error(CONVOS_REMOVE_MEMBER, 'Must remove a user who is in the convo.');
      }
      const team = Teams.findOne(convo.teamId);
      if (!team) {
        throw new Meteor.Error(CONVOS_REMOVE_MEMBER, 'Must remove a user from a convo in an existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(CONVOS_REMOVE_MEMBER, 'Must be admin to remove users from convo.');
      }

      convo.set({
        userIds: R.filter(id => id !== removeUserId, convo.userIds)
      });
      convo.save();

      const removeUser = Meteor.users.findOne(removeUserId);
      Meteor.call('msgs.add', {
        text: `${removeUser.username} was removed from the chat.`,
        convoId,
        isSystemMsg: true
      });
    }
  });

  // SERVER ONLY
  const CONVOS_REMOVE_USER_FROM_TEAM = 'convos.removeUserFromTeam';
  Meteor.methods({
    'convos.removeUserFromTeam'({removeUserId, teamId}) {
      check(arguments[0], {
        removeUserId: String,
        teamId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(CONVOS_REMOVE_USER_FROM_TEAM,
          'Must be logged in to remove users from convo.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(CONVOS_REMOVE_USER_FROM_TEAM,
          'Must remove users from existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(CONVOS_REMOVE_USER_FROM_TEAM,
          'Must be an admin to remove users from all convos in team.');
      }

      const convos = Convos.find({userIds: removeUserId}).fetch();
      convos.forEach(convo => {
        Meteor.call('convos.removeMember', {convoId: convo._id, removeUserId});

        // convo.set({userIds: R.filter(id => id !== removeUserId, convo.userIds)});
        // convo.save();
      });
    }
  });

  // SERVER ONLY
  const CONVOS_IS_MEMBER = 'convos.isMember';
  Meteor.methods({
    'convos.isMember'({convoId}) {
      check(arguments[0], {
        convoId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(CONVOS_IS_MEMBER, 'Must be logged in to view convo.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(CONVOS_IS_MEMBER, 'Must be a member of existing convo.');
      }
      Meteor.call('teams.isMember', {teamId: convo.teamId});
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(CONVOS_IS_MEMBER, 'User is not a member of convo.');
      }

      return convo.isUserInConvo(userId);
    }
  });

  const CONVOS_SET_NAME = 'convos.setName';
  Meteor.methods({
    'convos.setName'({convoId, name}) {
      check(arguments[0], {
        convoId: String,
        name: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(CONVOS_SET_NAME, 'Must be logged in to set chat name.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(CONVOS_SET_NAME, 'Must set the name of an existing chat.');
      }
      if (!convo.isUserAdmin(userId)) {
        throw new Meteor.Error(CONVOS_SET_NAME, 'Must be an admin of chat to set the chat name.');
      }

      convo.set({name});
      convo.save();
    }
  });

  // SERVER ONLY
  const CONVOS_REMOVE = 'convos.remove';
  Meteor.methods({
    'convos.remove'({convoId}) {
      check(arguments[0], {
        convoId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(CONVOS_REMOVE, 'Must be logged in to remove convo.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(CONVOS_REMOVE, 'Must remove an existing convo.');
      }
      const team = Teams.findOne(convo.teamId);
      if (!team) {
        throw new Meteor.Error(CONVOS_REMOVE, 'Must remove a convo from an existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(CONVOS_REMOVE, 'Must be a team admin to remove a convo.');
      }

      // Remove from all convo users last time in convo as well.
      const selector = { _id: { $in: convo.userIds } };
      const unsetObj = { [`lastTimeInConvo.${convoId}`]: '' };
      const modifier = { $unset: unsetObj };
      const options = { multi: true };
      Meteor.users.update(selector, modifier, options);

      // Remove all associated data for this convo
      Messages.remove({convoId});

      const note = Notes.findOne({convoId});
      Notes.remove({convoId});
      Sections.remove({noteId: note._id});

      Notifications.remove({convoId});

      // Remove convo
      convo.remove();
    }
  });

  const CONVOS_LEAVE = 'convos.leave';
  Meteor.methods({
    'convos.leave'({convoId}) {
      check(arguments[0], {
        convoId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(CONVOS_LEAVE, 'Must be logged in to leave convo.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(CONVOS_LEAVE, 'Must leave an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(CONVOS_LEAVE, 'Must leave a convo you are a part of.');
      }

      // Send msg before you leave
      const user = Meteor.users.findOne(userId);
      Meteor.call('msgs.add', {
        text: `${user.username} has left the chat.`,
        convoId,
        isSystemMsg: true
      });

      // Update user
      const selector = userId;
      const unsetObj = { [`lastTimeInConvo.${convoId}`]: '' };
      const modifier = { $unset: unsetObj };
      Meteor.users.update(selector, modifier);

      // Remove id from convo
      const userIds = convo.userIds;
      convo.set({
        userIds: R.filter(id => id !== userId, userIds)
      });
      convo.save();
    }
  });
}
