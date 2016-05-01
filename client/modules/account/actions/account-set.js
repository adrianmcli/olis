import { Accounts } from 'meteor/accounts-base';
import EmailValidator from 'email-validator';
import R from 'ramda';
import LangCodes from '/lib/constants/lang_codes';

export default {
  setDescription({Meteor}, description) {
    Meteor.call('account.set.description', {description}, err => {
      if (err) { alert(err); }
    });
  },

  setEmail({Meteor}, email) {
    try {
      if (!EmailValidator.validate(email)) {
        throw new Meteor.Error('actions.account.setEmail', 'Enter a proper email.');
      }

      Meteor.call('account.setEmail', {email}, err => {
        if (err) { alert(err); }
        else { alert('Email changed!'); }
      });
    }
    catch (e) { alert(e); }
  },

  setTranslationLanguage({Meteor}, langCode) {
    try {
      if (!R.contains(langCode, R.keys(LangCodes))) {
        throw new Meteor.Error(
          'actions.account.setTranslationLanguage', 'Select a proper language code.');
      }

      Meteor.call('account.setTranslationLanguage', {langCode}, err => {
        if (err) { alert(err); }
        else { console.log('Translation language changed.'); }
      });
    }
    catch (e) { alert(e); }
  },

  setMuteNotificationSound({Meteor}, mute) {
    Meteor.call('account.setMuteNotificationSound', {mute}, err => {
      if (err) { alert(err); }
    });
  },


  setUsername({Meteor}, username) {
    Meteor.call('account.setDisplayName', {displayName: username}, (err) => {
      if (err) { alert(err); }
      else { alert('Username changed!'); }
    });
  },

  changePassword({Meteor}, oldPassword, newPassword1, newPassword2) {
    try {
      if (newPassword1 !== newPassword2) {
        throw new Meteor.Error('actions.account.changePassword', 'New passwords must match.');
      }

      Accounts.changePassword(oldPassword, newPassword1, (err) => {
        if (err) { alert(err); }
        else { alert('Password changed!'); }
      });
    }
    catch (e) { alert(e); }
  },
};
