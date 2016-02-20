import {check} from 'meteor/check';
import R from 'ramda';

export default function ({Meteor, Collections}) {
  const CONVOS_ADD = 'convos.add';
  Meteor.methods({
    'convos.add'({name, userIds, teamId}) {
      const userId = Meteor.userId();
      if (!userId) {
        throw new Meteor.Error(CONVOS_ADD, 'Must be logged in to insert convo.');
      }
      const team = Collections.Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(CONVOS_ADD, 'Team does not exist.');
      }
      if (!team.isUserInTeam(userIds)) {
        throw new Meteor.Error(CONVOS_ADD, 'At least one user doesn\'t belong to the team');
      }

      check(arguments[0], {
        name: String,
        userIds: [ String ],
        teamId: String,
      });

      const newUserIds = [ userId, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      const convo = new Collections.Convo();
      convo.set({name, userIds: uniqueUserIds, teamId});
      convo.save();
    }
  });
}
