import {Meteor} from 'meteor/meteor';
import {Team} from '../../lib/collections';
import {check} from 'meteor/check';
import R from 'ramda';

export default function () {
  const TEAMS_ADD = 'teams.add';
  Meteor.methods({
    'teams.add'({name, userIds}) {
      if (!this.userId) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }

      check(arguments[0], {
        name: String,
        userIds: [ String ]
      });

      const newUserIds = [ this.userId, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      Meteor._sleepForMs(5000);

      const team = new Team();
      team.set({name, userIds: uniqueUserIds});
      team.save();
      return team; // Will return _id, and the server side only stuff too
    }
  });
}
