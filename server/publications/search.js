import {Mongo} from 'meteor/mongo';
import {Teams, Messages, Convos} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import R from 'ramda';
import {othersFields} from './users';

const buildRegExp = (searchText) => {
  let words = searchText.trim().split(/[ \-\:]+/);
  let exps = words.map(word => `(?=.*${word})`);
  let fullExp = exps.join('') + '.+';
  return new RegExp(fullExp, 'i');
};

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
        sort: { score: { $meta: 'textScore' } },
        limit: 10
      };
      Mongo.Collection._publishCursor(
        Messages.find(selector, options), this, 'searchMessages');
    };

    const _getConvos = () => {
      const selector = {
        userIds: userId,
        $text: { $search: text }
      };
      const options = {
        fields: { score: { $meta: 'textScore' } },
        sort: { score: { $meta: 'textScore' } },
        limit: 10
      };
      Mongo.Collection._publishCursor(
        Convos.find(selector, options), this, 'convos');
    };

    const _getUsers = () => {
      const regExp = buildRegExp(text);
      const selector = {
        $and: [
          {
            $or: [
              {[`roles.${teamId}`]: 'admin'},
              {[`roles.${teamId}`]: 'member'}
            ]
          },
          {
            $or: [
              {username: regExp},
              {'emails.address': regExp}
            ]
          }
        ]
        // $text: { $search: text }
      };

      const fieldsObj = R.merge({
        // score: { $meta: 'textScore' }
      }, othersFields);

      const options = {
        fields: fieldsObj,
        // sort: { score: { $meta: 'textScore' } },
        limit: 10
      };
      Mongo.Collection._publishCursor(
        Meteor.users.find(selector, options), this, 'searchUsers');
    };

    _getMsgs();
    _getConvos();
    _getUsers();

    this.ready();
  });
}
