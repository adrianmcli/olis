import {check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles';
import R from 'ramda';

export default function ({Meteor, Collections}) {
  const TEAMS_ADD = 'teams.add';
  Meteor.methods({
    'teams.add'({name, userIds}) {
      if (!Meteor.userId()) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }

      check(arguments[0], {
        name: String,
        userIds: [ String ]
      });

      const newUserIds = [ Meteor.userId(), ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      const team = new Collections.Team();
      team.set({name, userIds: uniqueUserIds});
      team.save();

      // Add users to roles
      Roles.addUsersToRoles(Meteor.userId(), [ 'admin' ], team._id);
      Roles.addUsersToRoles(userIds, [ 'member' ], team._id);

      return team; // Will return _id, and the server side only stuff too
    }
  });
}
