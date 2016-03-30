import React from 'react';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import MyAccount from '../components/MyAccount.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  goToChat: actions.msgs.goToChat,
  uploadImage: actions.images.add,
  setUsername: actions.account.setUsername,
  changePassword: actions.account.changePassword,
  setEmail: actions.account.setEmail,
  setTranslationLanguage: actions.account.setTranslationLanguage
});

export const composer = ({context}, onData) => {
  const {Meteor} = context();
  const user = Meteor.user();
  if (user) {
    const email = user.emails ? user.emails[0] ? user.emails[0].address : null : null;

    onData(null, {
      username: user.username,
      profileImageUrl: user.profileImageUrl ? user.profileImageUrl : null,
      email,
      translationLangCode: user.translationLangCode
    });
  }
};

export default composeAll(
  composeWithTracker(composer, function () {
    return React.createElement('div', null);
  }),
  useDeps(depsMapper)
)(MyAccount);
