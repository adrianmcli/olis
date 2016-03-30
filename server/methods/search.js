import {Meteor} from 'meteor/meteor';
import {Teams} from '/lib/collections';
import {check} from 'meteor/check';

export default function () {
  const SEARCH_TEAM = 'search.team';
  Meteor.methods({
    'search.team'({teamId}) {
      check(arguments[0], {
        teamId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(SEARCH_TEAM, 'Must be logged in to search.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(SEARCH_TEAM, 'Must search an existing team.');
      }
      if (!team.isUserMember(userId)) {
        throw new Meteor.Error(SEARCH_TEAM, 'Must be a member of a team to search it.');
      }
    }
  });
}
