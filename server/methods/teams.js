import {Meteor} from 'meteor/meteor';
import {Teams} from '/lib/collections';
import Team from '/lib/team';
import {check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';
import R from 'ramda';
import EmailValidator from 'email-validator';

export default function () {
  const TEAMS_ADD = 'teams.add';
  Meteor.methods({
    'teams.add'({name, userIds}) {
      check(arguments[0], {
        name: String,
        userIds: [ String ]
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }

      const newUserIds = [ userId, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      // Can't use Meteor.setTimeout here
      // Cuz simulation will insert obj, but server looks like it inserted nothing since we didn't block it.
      // The simulated insert will revert to nothing. Then X time later the server will actually insert.
      // Meteor._sleepForMs(3000);

      const team = new Team();
      team.set({name, userIds: uniqueUserIds});
      team.save();

      // Add users to roles
      Roles.addUsersToRoles(userId, [ 'admin' ], team._id);
      Roles.addUsersToRoles(userIds, [ 'member' ], team._id);

      // return team; // Will return _id, and the server side only stuff too
      return team._id;
    }
  });

  const TEAMS_ADD_MEMBERS = 'teams.addMembers';
  Meteor.methods({
    'teams.addMembers'({teamId, userIds}) {
      check(arguments[0], {
        teamId: String,
        userIds: [ String ]
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD_MEMBERS, 'Must be logged in to insert team.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_ADD_MEMBERS, 'Must add members to an existing team.');
      }
      if (!team.isUserInTeam(userId)) {
        throw new Meteor.Error(TEAMS_ADD_MEMBERS, 'Must be a part of team to add new members to it.');
      }

      Roles.addUsersToRoles(userIds, [ 'member' ], teamId);

      const newUserIds = [ ...team.userIds, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      team.set({userIds: uniqueUserIds});
      team.save();

      return team;
    }
  });

  const TEAMS_SET_NAME = 'teams.setName';
  Meteor.methods({
    'teams.setName'({teamId, name}) {
      check(arguments[0], {
        teamId: String,
        name: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_SET_NAME, 'Must be logged in to change team name.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_SET_NAME, 'Must change name of existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(TEAMS_SET_NAME, 'Must be admin to change name of team.');
      }

      team.set({name});
      team.save();
    }
  });

  const TEAMS_SET_USER_ROLE = 'teams.setUserRole';
  Meteor.methods({
    'teams.setUserRole'({teamId, changeUserId, role}) {
      check(arguments[0], {
        teamId: String,
        changeUserId: String,
        role: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE, 'Must be logged in to change user roles.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE,
          'Must change of role of user in existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE,
          'Must be admin to change roles of team members.');
      }
      if (!team.isUserInTeam(changeUserId)) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE,
          'Must change role of existing user.');
      }

      const cleanRole = R.toLower(role);
      const rolesList = [ 'admin', 'member' ];
      if (!R.contains(cleanRole, rolesList)) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE,
          `Must change role to acceptable role. (${rolesList})`);
      }

      const teamUsers = Meteor.users.find({_id: {$in: team.userIds}}).fetch();
      const getCurrentNumAdmins = () => {
        const roles = teamUsers.map(teamUser => teamUser.roles[teamId]);
        const count = R.countBy(_role => _role)(roles);
        return count['admin'];
      };
      const changeUser = Meteor.users.findOne(changeUserId);
      const wrongNumAdminsAfterRoleChange = () => {
        return getCurrentNumAdmins() <= 1 && team.isUserAdmin(changeUser._id) && role === 'member';
      };
      if (wrongNumAdminsAfterRoleChange()) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE,
          'Must have at least one admin.');
      }

      const oldRoles = team.getRolesForUser(changeUserId);
      Roles.removeUsersFromRoles(changeUserId, oldRoles[0], teamId);
      Roles.addUsersToRoles(changeUserId, role, teamId);
    }
  });

  // SERVER ONLY
  const TEAMS_INVITE = 'teams.invite';
  Meteor.methods({
    'teams.invite'({inviteEmails, teamId}) {
      check(arguments[0], {
        inviteEmails: [ String ],
        teamId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_INVITE, 'Must be logged in to invite people.');
      }
      const user = Meteor.users.findOne(userId);
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_INVITE, 'Must invite people to an existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(TEAMS_INVITE, 'Must be an admin to invite people to team.');
      }
      const filteredEmails = R.filter(email => EmailValidator.validate(email), inviteEmails);

      const existingEmails = R.filter(email => {
        const existingUser = Accounts.findUserByEmail(email);
        return existingUser;
      }, filteredEmails);

      const newEmails = R.difference(filteredEmails, existingEmails);

      const existingUserIds = existingEmails.map(email => {
        const existingUser = Accounts.findUserByEmail(email);
        return existingUser._id;
      });

      const newUserIds = newEmails.map(email => {
        const newId = Accounts.createUser({username: email, email});
        Meteor.users.update(newId, { $set: {invitedBy: user.username} });
        return newId;
      });

      // Update team
      team.set({
        userIds: R.uniq([ ...team.userIds, ...newUserIds, ...existingUserIds ]),
        pendingInviteIds: R.uniq([ ...team.pendingInviteIds, ...newUserIds, ...existingUserIds ])
      });
      team.save();
      Roles.addUsersToRoles([ ...newUserIds, ...existingUserIds ], [ 'member' ], teamId);

      // Send out emails
      newUserIds.forEach(id => Accounts.sendEnrollmentEmail(id));
      existingEmails.forEach(email => {
        Email.send({
          from: 'Olis <contact.aheadstudios@gmail.com>',
          to: email,
          subject: 'You have been invited to a new Olis Team.',
          text: `${user.username} has invited you to join their Olis team ${team.name}!\n\n
            Sign in and accept their invite.`,
        });
      });
    }
  });
}
