import {Meteor} from 'meteor/meteor';
import {Teams, Team} from '../../lib/collections';
import {check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';
import R from 'ramda';

export default function () {
  const TEAMS_ADD = 'teams.add';
  Meteor.methods({
    'teams.add'({name, userIds}) {
      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }

      check(arguments[0], {
        name: String,
        userIds: [ String ]
      });

      const newUserIds = [ userId, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      // Can't use Meteor.setTimeout here
      // Cuz simulation will insert obj, but server looks like it inserted nothing since we didn't block it.
      // The simulated insert will revert to nothing. Then X time later the server will actually insert.
      Meteor._sleepForMs(3000);

      const team = new Team();
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

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_ADD_MEMBERS, 'Must add members to an existing team.');
      }

      Meteor._sleepForMs(3000);

      Roles.addUsersToRoles(userIds, [ 'member' ], teamId);

      const newUserIds = [ ...team.userIds, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      team.set({userIds: uniqueUserIds});
      team.save();
    }
  });
}
