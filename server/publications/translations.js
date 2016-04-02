import {Convos, Teams, Translations} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  const TRANSLATIONS_LIST = 'translations.list';
  Meteor.publish(TRANSLATIONS_LIST, function ({msgIds, convoId}) {
    check(arguments[0], {
      msgIds: [ String ],
      convoId: String
    });

    const userId = this.userId;
    if (!userId) {
      throw new Meteor.Error(TRANSLATIONS_LIST, 'Must be logged in to get translations.');
    }
    const user = Meteor.users.findOne(userId);
    const convo = Convos.findOne(convoId);
    if (!convo) {
      throw new Meteor.Error(TRANSLATIONS_LIST, 'Must get translations from an existing convo.');
    }
    const team = Teams.findOne(convo.teamId);
    if (!team) {
      throw new Meteor.Error(TRANSLATIONS_LIST,
        'Must get translations from a convo in an existing team.');
    }
    if (!team.isUserInTeam(this.userId)) {
      throw new Meteor.Error(TRANSLATIONS_LIST, 'Must be a member of team to get translations.');
    }
    if (!convo.isUserInConvo(this.userId)) {
      throw new Meteor.Error(TRANSLATIONS_LIST,
        'Must be a member of convo to get the convo\'s translations.');
    }

    const langCode = user.translationLangCode;
    return Translations.find({convoId, msgId: {$in: msgIds}, langCode});
  });
}
