import {Meteor} from 'meteor/meteor';

export default function () {
  // Not using Astro for this since it interferes with passwords and sign in.

  Meteor.users.before.insert((userId, doc) => {
    doc.translationLangCode = 'en';
    doc.muteNotificationSound = false;
  });
}
