import {Teams, Convos} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  const CONVOS_LIST = 'convos.list';
  Meteor.publish(CONVOS_LIST, function ({teamId}) {
    check(arguments[0], {
      teamId: String
    });

    if (!this.userId) {
      throw new Meteor.Error(CONVOS_LIST, 'Must be logged in to get convos list.');
    }
    const team = Teams.findOne(teamId);
    if (!team.isUserInTeam(this.userId)) {
      throw new Meteor.Error(CONVOS_LIST, 'Must be a member of team to get team convos list.');
    }

    return Convos.find({teamId, userIds: this.userId});
  });

  const CONVOS_LIST_MULTI = 'convos.list.multi';
  Meteor.publish(CONVOS_LIST_MULTI, function ({teamIds}) {
    check(arguments[0], {
      teamIds: [ String ]
    });

    if (!this.userId) {
      throw new Meteor.Error(CONVOS_LIST_MULTI, 'Must be logged in to get convos list.');
    }
    const teams = Teams.find({_id: {$in: teamIds}}).fetch();
    teams.forEach(team => {
      if (!team.isUserInTeam(this.userId)) {
        throw new Meteor.Error(CONVOS_LIST_MULTI, 'Must be a member of team to get team convos list.');
      }
    });
    return Convos.find({teamId: {$in: teamIds}, userIds: this.userId});
  });
}
