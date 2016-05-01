import { Meteor } from 'meteor/meteor';
import { Convos, Teams, Messages } from '/lib/collections';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import R from 'ramda';
import { Cloudinary } from 'meteor/lepozepo:cloudinary';

export default function () {
  const SET_DESC = 'account.set.description';
  Meteor.methods({
    'account.set.description'({description}) {
      check(arguments[0], {
        description: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(SET_DESC, 'Must be logged in to set description.');
      }

      Meteor.users.update(userId, {
        $set: { description },
      });
    },
  });

  const SET_DISPLAY_NAME = 'account.setDisplayName';
  Meteor.methods({
    'account.setDisplayName'({displayName}) {
      check(arguments[0], {
        displayName: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(SET_DISPLAY_NAME, 'Must be logged in to set display name.');
      }

      Meteor.users.update(userId, {
        $set: { displayName },
      });
    },
  });


  const SET_TRANSLATION_LANG = 'account.setTranslationLanguage';
  Meteor.methods({
    'account.setTranslationLanguage'({langCode}) {
      check(arguments[0], {
        langCode: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(SET_TRANSLATION_LANG,
          'Must be logged in to change translation language.');
      }
      Meteor.users.update(userId, {
        $set: {translationLangCode: langCode},
      });
    },
  });

  const SET_MUTE = 'account.setMuteNotificationSound';
  Meteor.methods({
    'account.setMuteNotificationSound'({mute}) {
      check(arguments[0], {
        mute: Boolean,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(SET_MUTE, 'Must be logged in to toggle notification sound.');
      }

      Meteor.users.update(userId, {
        $set: { muteNotificationSound: mute},
      });
    },
  });

  const SET_EMAIL = 'account.setEmail';
  Meteor.methods({
    'account.setEmail'({email}) {
      check(arguments[0], {
        email: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(SET_EMAIL, 'Must be logged in to change email.');
      }
      const user = Meteor.users.findOne(userId);
      Meteor.call('account.validate.registerEmail', {email});
      Accounts.removeEmail(userId, user.emails[0].address);
      Accounts.addEmail(userId, email); // This does not check for proper email form, only existence in DB
    },
  });

  const SET_PROFILE_PIC = 'account.addProfilePic';
  Meteor.methods({
    'account.addProfilePic'({cloudinaryPublicId}) {
      check(arguments[0], {
        cloudinaryPublicId: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(SET_PROFILE_PIC, 'Must be logged in to change profile picture.');
      }
      if (R.isEmpty(cloudinaryPublicId)) {
        throw new Meteor.Error(SET_PROFILE_PIC,
          'cloudinaryPublicId cannot be an empty string.'
        );
      }

      const transform = {
        width: 100,
        height: 100,
        quality: 80,
        sign_url: true,
      };
      Meteor.users.update(userId, {
        $set: {profileImageUrl: Cloudinary.url(cloudinaryPublicId, transform)},
      });
    },
  });


  const ACCOUNT_LAST_TIME_CONVO = 'account.setLastTimeInConvo';
  Meteor.methods({
    'account.setLastTimeInConvo'({convoId}) {
      check(arguments[0], {
        convoId: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must be logged in to set last time in convo.');
      }
      const convo = Convos.findOne(convoId);
      if (!convo) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must set last time in an existing convo.');
      }
      if (!convo.isUserInConvo(userId)) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_CONVO, 'Must be member of convo to set last time in it.');
      }

      let setObj = {};
      setObj[`lastTimeInConvo.${convoId}`] = {
        timestamp: new Date(),
        numMsgs: Messages.find({convoId}).count(),
      };
      const modifier = { $set: setObj };
      Meteor.users.update(userId, modifier);
    },
  });

  const ACCOUNT_LAST_TIME_TEAM = 'account.setLastTimeInTeam';
  Meteor.methods({
    'account.setLastTimeInTeam'({teamId}) {
      check(arguments[0], {
        teamId: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_TEAM, 'Must be logged in to set last time in team.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_TEAM, 'Must set last time in an existing team.');
      }
      if (!team.isUserInTeam(userId)) {
        throw new Meteor.Error(ACCOUNT_LAST_TIME_TEAM, 'Must be member of team to set last time in it.');
      }

      let setObj = {};
      setObj[`lastTimeInTeam.${teamId}`] = new Date();
      const modifier = { $set: setObj };
      Meteor.users.update(userId, modifier);
    },
  });  

  // SERVER ONLY
  const ACCOUNT_REMOVE_FROM_TEAM = 'account.removeFromTeam';
  Meteor.methods({
    'account.removeFromTeam'({removeUserId, teamId}) {
      check(arguments[0], {
        removeUserId: String,
        teamId: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(ACCOUNT_REMOVE_FROM_TEAM, 'Must be logged in to remove user from team.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(ACCOUNT_REMOVE_FROM_TEAM, 'Must remove user from existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(ACCOUNT_REMOVE_FROM_TEAM, 'Must be an admin to remove user from team.');
      }

      const convos = Convos.find({teamId}).fetch();
      const convoIdsToUnset = convos.reduce((prev, curr) => {
        const convo = {
          [`lastTimeInConvo.${curr._id}`]: '',
        };
        return R.merge(prev, convo);
      }, {});

      const unsetObj = R.merge({
        [`roles.${teamId}`]: '',
        [`lastTimeInTeam.${teamId}`]: '',
      }, convoIdsToUnset);

      Meteor.users.update(removeUserId, {
        $unset: unsetObj,
      });
    },
  });
}
