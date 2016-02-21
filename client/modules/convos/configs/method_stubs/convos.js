import {check} from 'meteor/check';
import R from 'ramda';

export default function ({Meteor, Collections, Models}) {
  const CONVOS_ADD = 'convos.add';
  Meteor.methods({
    'convos.add'({name, userIds, teamId}) {
      const userId = Meteor.userId();
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
      const team = Collections.Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(CONVOS_ADD, 'Team does not exist.');
      }
      if (!team.isUserInTeam(uniqueUserIds)) {
        throw new Meteor.Error(CONVOS_ADD, 'At least one user doesn\'t belong to the team');
      }

      const convo = new Models.Convo();
      convo.set({name, userIds: uniqueUserIds, teamId});
      convo.save();
    }
  });

  const CONVOS_ADD_MEMBERS = 'convos.addMembers';
  Meteor.methods({
    'convos.addMembers'({convoId, userIds}) {
      const userId = Meteor.userId();
      check(arguments[0], {
        convoId: String,
        userIds: [ String ]
      });

      if (!userId) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Must be logged in to add members to convo.');
      }
      const convo = Collections.Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Must add members to an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Must already be a member of convo to add new members.');
      }
      const team = Collections.Teams.findOne(convo.teamId);
      if (!team.isUserInTeam(userIds)) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Only users in the team can be added to the convo.');
      }

      const newUserIds = [ ...convo.userIds, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      convo.set({userIds: uniqueUserIds});
      convo.save();
    }
  });
}
