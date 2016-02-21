import {check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';
import R from 'ramda';

export default function ({Meteor, Collections, Models}) {
  const TEAMS_ADD = 'teams.add';
  Meteor.methods({
    'teams.add'({name, userIds}) {
      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }

      check(arguments[0], {
        name: String,
        userIds: [ String ]
      });

      const newUserIds = [ userId, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      const team = new Models.Team();
      team.set({name, userIds: uniqueUserIds});
      team.save();

      // Add users to roles
      Roles.addUsersToRoles(userId, [ 'admin' ], team._id);
      Roles.addUsersToRoles(userIds, [ 'member' ], team._id);

      return team; // Will return _id, and the server side only stuff too
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
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }
      const team = Collections.Teams.findOne(teamId);
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
    }
  });
}
