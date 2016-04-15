import {check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';
import R from 'ramda';

export default function ({Meteor, Collections, Schemas}) {
  const TEAMS_ADD = 'teams.add';
  Meteor.methods({
    'teams.add'({name, userIds}) {
      check(arguments[0], {
        name: String,
        userIds: [ String ]
      });

      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }

      const newUserIds = [ userId, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      // Can't use Meteor.setTimeout here
      // Cuz simulation will insert obj, but server looks like it inserted nothing since we didn't block it.
      // The simulated insert will revert to nothing. Then X time later the server will actually insert.
      // Meteor._sleepForMs(3000);

      const team = new Schemas.Team();
      team.set({name, userIds: uniqueUserIds});
      team.save();

      // Add users to roles
      Roles.addUsersToRoles(userId, [ 'admin' ], team._id);
      Roles.addUsersToRoles(userIds, [ 'member' ], team._id);
    }
  });

  const TEAMS_ADD_MEMBERS = 'teams.addMembers';
  Meteor.methods({
    'teams.addMembers'({teamId, userIds}) {
      check(arguments[0], {
        teamId: String,
        userIds: [ String ]
      });

      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD_MEMBERS, 'Must be logged in to insert team.');
      }
      const team = Collections.Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_ADD_MEMBERS, 'Must add members to an existing team.');
      }
      if (!team.isUserInTeam(userId)) {
        throw new Meteor.Error(TEAMS_ADD_MEMBERS,
          'Must be a part of team to add new members to it.');
      }

      Roles.addUsersToRoles(userIds, [ 'member' ], teamId);

      const newUserIds = [ ...team.userIds, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      team.set({userIds: uniqueUserIds});
      team.save();
    }
  });

  const TEAMS_SET_NAME = 'teams.setName';
  Meteor.methods({
    'teams.setName'({teamId, name}) {
      check(arguments[0], {
        teamId: String,
        name: String
      });

      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error(TEAMS_SET_NAME, 'Must be logged in to change team name.');
      }
      const team = Collections.Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_SET_NAME, 'Must change name of existing team.');
      }
      if (!Roles.userIsInRole(userId, 'admin', teamId)) {
        throw new Meteor.Error(TEAMS_SET_NAME, 'Must be admin to change name of team.');
      }

      team.set({name});
      team.save();
    }
  });

  const TEAMS_SET_INFO = 'teams.setInfo';
  Meteor.methods({
    'teams.setInfo'({teamId, info}) {
      check(arguments[0], {
        teamId: String,
        info: String
      });

      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error(TEAMS_SET_INFO, 'Must be logged in to set team info.');
      }
      const team = Collections.Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_SET_INFO, 'Must set info of existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(TEAMS_SET_INFO, 'Must be admin to set info of team.');
      }

      team.set({info});
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

      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE, 'Must be logged in to change user roles.');
      }
      const team = Collections.Teams.findOne(teamId);
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
}
