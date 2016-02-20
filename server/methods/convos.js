import {Meteor} from 'meteor/meteor';
import {Convos, Convo, Teams} from '../../lib/collections';
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

      if (!userId) {
        throw new Meteor.Error(CONVOS_ADD, 'Must be logged in to insert convo.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(CONVOS_ADD, 'Must add convo to existing team.');
      }
      if (!team.isUserInTeam(userId)) {
        throw new Meteor.Error(CONVOS_ADD, 'Must be a member of team to add new convo.');
      }
      if (!team.isUserInTeam(userIds)) {
        throw new Meteor.Error(CONVOS_ADD, 'Only users in the team can be added to the convo.');
      }

      Meteor._sleepForMs(3000);

      const convo = new Convo();
      const newUserIds = [ userId, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);
      convo.set({name, userIds: uniqueUserIds, teamId});
      convo.save();

      return convo;
    }
  });

  const CONVOS_ADD_MEMBERS = 'convos.addMembers';
  Meteor.methods({
    'convos.addMembers'({convoId, userIds}) {
      const userId = this.userId;
      check(arguments[0], {
        convoId: String,
        userIds: [ String ]
      });

      if (!userId) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Must be logged in to add members to convo.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Must add members to an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Must already be a member of convo to add new members.');
      }
      const team = Teams.findOne(convo.teamId);
      if (!team.isUserInTeam(userIds)) {
        throw new Meteor.Error(CONVOS_ADD_MEMBERS, 'Only users in the team can be added to the convo.');
      }

      Meteor._sleepForMs(3000);

      const newUserIds = [ ...convo.userIds, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      convo.set({userIds: uniqueUserIds});
      convo.save();

      return convo;
    }
  });
}
