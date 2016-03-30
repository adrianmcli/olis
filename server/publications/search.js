import {Teams, Messages} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  const SEARCH_RESULTS = 'search.results';
  Meteor.publish(SEARCH_RESULTS, function ({teamId, text}) {
    check(arguments[0], {
      teamId: String,
      text: String
    });

    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error(SEARCH_RESULTS, 'Must be logged in to search.');
    }
    const team = Teams.findOne(teamId);
    if (!team) {
      throw new Meteor.Error(SEARCH_RESULTS, 'Must search an existing team.');
    }
    if (!team.isUserMember(userId)) {
      throw new Meteor.Error(SEARCH_RESULTS, 'Must be a member of a team to search it.');
    }

    const msgs = Messages.find(
      {$text: {$search: text}},
      {
        fields: {
          score: {$meta: 'textScore'}
        },
        sort: {
          score: {$meta: 'textScore'}
        }
      }
    );

    return [
      msgs
    ];

  });
}
