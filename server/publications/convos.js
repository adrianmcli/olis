import {Teams, Convos} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  const CONVOS_LIST = 'convos.list';
  Meteor.publish(CONVOS_LIST, function ({teamId}) {
    if (!this.userId) {
      throw new Meteor.Error(CONVOS_LIST, 'Must be logged in to get convos list.');
    }
    check(arguments[0], {
      teamId: String
    });
    const team = Teams.findOne(teamId);
    if (!team) {
      throw new Meteor.Error(CONVOS_LIST, 'User is not part of the team');
    }

    return Convos.find({teamId, userIds: this.userId});
  });
}
