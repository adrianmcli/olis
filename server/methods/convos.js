import {Meteor} from 'meteor/meteor';
import {Convo, Teams} from '../../lib/collections';
import {check} from 'meteor/check';
import R from 'ramda';

export default function () {
  const CONVOS_ADD = 'convos.add';
  Meteor.methods({
    'convos.add'({name, userIds, teamId}) {
      const userId = this.userId;
      check(arguments[0], {
        name: String,
        userIds: [ String ],
        teamId: String,
      });

      const newUserIds = [ userId, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      if (!userId) {
        throw new Meteor.Error(CONVOS_ADD, 'Must be logged in to insert convo.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(CONVOS_ADD, 'Team does not exist.');
      }
      if (!team.isUserInTeam(uniqueUserIds)) {
        throw new Meteor.Error(CONVOS_ADD, 'At least one user doesn\'t belong to the team');
      }

      Meteor._sleepForMs(3000);

      const convo = new Convo();
      convo.set({name, userIds: uniqueUserIds, teamId});
      convo.save();

      return convo;
    }
  });
}
