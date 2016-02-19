import {check} from 'meteor/check';
import R from 'ramda';

export default function ({Meteor, Collections}) {
  const TEAMS_ADD = 'teams.add';
  Meteor.methods({
    'teams.add'({name, userIds}) {
      if (!Meteor.userId) {
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
    }
  });
}
