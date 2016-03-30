import {Teams, Messages, Convos} from '/lib/collections';
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

    const convosUserIsMember = Convos.find({userIds: userId});
    const convoIds = convosUserIsMember.map(convo => convo._id);

    const _getMsgs = () => {
      const selector = {
        convoId: { $in: convoIds },
        $text: { $search: text }
      };
      const options = {
        fields: { score: { $meta: 'textScore' } },
        sort: { score: { $meta: 'textScore' } }
      };
      return Messages.find(selector, options);
    };
    // console.log(_getMsgs().fetch());
    // return _getMsgs();

    const _getConvos = () => {
      const selector = {
        userIds: userId,
        $text: { $search: text }
      };
      const options = {
        fields: { score: { $meta: 'textScore' } },
        sort: { score: { $meta: 'textScore' } }
      };
      return Convos.find(selector, options);
    };
    // console.log(_getConvos().fetch());
    // return _getConvos();

    const _getUsers = () => {
      const selector = {
        $text: {$search: text}
      };
      const options = {
        fields: {
          score: {$meta: 'textScore'},
          username: 1,
          emails: 1,
          profileImageUrl: 1
        },
        sort: { score: { $meta: 'textScore' } }
      };
      return Meteor.users.find(selector, options);
    };
    // console.log(_getUsers().fetch());
    // return _getUsers();

    return [ _getMsgs(), _getConvos(), _getUsers() ];
  });
}
