import {Notifications, Teams} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

export default function () {
  const NOTIFICATIONS_LIST = 'notifications.list';
  Meteor.publish(NOTIFICATIONS_LIST, function ({teamId, convoId}) {
    check(arguments[0], {
      teamId: String,
      convoId: Match.Optional(Match.OneOf(undefined, null, String))
    });

    if (!this.userId) {
      throw new Meteor.Error(NOTIFICATIONS_LIST, 'Must be logged in to get notifications.');
    }
    const team = Teams.findOne(teamId);
    if (!team) {
      throw new Meteor.Error(NOTIFICATIONS_LIST,
        'Must be a member of team to get notifications from it.');
    }

    return Notifications.find({
      userId: this.userId,
      teamId,
      convoId: {$ne: convoId}
    });
  });
}
