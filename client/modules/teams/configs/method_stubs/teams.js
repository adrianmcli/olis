import {check} from 'meteor/check';
import R from 'ramda';

export default function ({Meteor, Collections}) {
  Meteor.methods({
    'teams.insert'({name, userIds}) {
      if (!Meteor.userId) {
        throw new Meteor.Error('teams.insert', 'Must be logged in to insert team.');
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
