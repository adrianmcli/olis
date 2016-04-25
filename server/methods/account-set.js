import { Meteor } from 'meteor/meteor';
import { Convos, Teams, Messages } from '/lib/collections';
import { Accounts } from 'meteor/accounts-base';
import Team from '/lib/schemas/team';
import Convo from '/lib/schemas/convo';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { Roles } from 'meteor/alanning:roles';
import R from 'ramda';
import EmailValidator from 'email-validator';
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
        description,
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
}
