import {Teams, Notifications} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import R from 'ramda';

/*  If you restrict the data you publish,
  the Astro Class will fill in the rest of the specified fields with null
  Also, if you don't restrict to only the client data,
  you will get
  Trying to set a value of the "serverOnly" field that does not exist in the "X" class
*/
export default function () {
  const TEAMS_LIST = 'teams.list';
  Meteor.publish(TEAMS_LIST, function (args) {
    check(args, Match.Optional(Match.OneOf(undefined, null, Object)));
    if (args) {
      check(args, {
        teamId: Match.Optional(Match.OneOf(undefined, null, String)),
        convoId: Match.Optional(Match.OneOf(undefined, null, String))
      });
    }

    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error(TEAMS_LIST, 'Must be logged in to get teams list.');
    }

    function mergeTeamId(selectObj) {
      if (!args) { return selectObj; }
      if (args.teamId) { return R.merge(selectObj, {teamId: {$ne: args.teamId}}); }
      return selectObj;
    }
    function mergeConvoId(selectObj) {
      if (!args) { return selectObj; }
      if (args.convoId) { return R.merge(selectObj, {convoId: {$ne: args.convoId}}); }
      return selectObj;
    }
    const getSelector = R.compose(mergeConvoId, mergeTeamId);

    const selectUserId = {userId};
    const selector = getSelector(selectUserId);

    console.log('selector');
    console.log(selector);

    return [
      Teams.find({userIds: userId}),
      Notifications.find(selector)
    ];
  });
}
